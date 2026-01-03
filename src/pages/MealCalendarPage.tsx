import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import WeeklyCalendar from '../components/calendar/WeeklyCalendar';
import RecipeSelector from '../components/calendar/RecipeSelector';
import { DayMeals, MealType, Recipe, MealPlanWithRecipe } from '../types/mealPlan';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import {
    getWeekStart,
    formatDateForDB,
    getWeekDates,
    formatWeekRange,
    getPreviousWeek,
    getNextWeek
} from '../utils/dateUtils';

const MealCalendarPage: React.FC = () => {
    const { userProfile } = useAuth();
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(new Date()));
    const [weekMeals, setWeekMeals] = useState<{ [day: number]: DayMeals }>({});
    const [loading, setLoading] = useState(true);
    const [selectorOpen, setSelectorOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{ day: number; mealType: MealType } | null>(null);

    const weekDates = getWeekDates(currentWeekStart);

    useEffect(() => {
        if (userProfile) {
            fetchWeekMealPlans();
        }
    }, [userProfile, currentWeekStart]);

    const fetchWeekMealPlans = async () => {
        if (!userProfile) return;

        setLoading(true);
        try {
            const weekStartStr = formatDateForDB(currentWeekStart);

            const { data, error } = await supabase
                .from('meal_plans')
                .select(`
          *,
          recipe:recipes(*)
        `)
                .eq('user_id', userProfile.id)
                .eq('week_start_date', weekStartStr);

            if (error) {
                console.error('Error fetching meal plans:', error);
                setLoading(false);
                return;
            }

            // Organize meals by day and type
            const organized: { [day: number]: DayMeals } = {};
            for (let i = 0; i < 7; i++) {
                organized[i] = { breakfast: null, lunch: null, dinner: null };
            }

            (data || []).forEach((mealPlan: MealPlanWithRecipe) => {
                const day = mealPlan.day_of_week;
                const type = mealPlan.meal_type;
                organized[day][type] = mealPlan;
            });

            setWeekMeals(organized);
            setLoading(false);
        } catch (err) {
            console.error('Exception fetching meal plans:', err);
            setLoading(false);
        }
    };

    const handleAddMeal = (dayOfWeek: number, mealType: MealType) => {
        setSelectedSlot({ day: dayOfWeek, mealType });
        setSelectorOpen(true);
    };

    const handleRemoveMeal = async (dayOfWeek: number, mealType: MealType) => {
        if (!userProfile) return;

        try {
            const weekStartStr = formatDateForDB(currentWeekStart);

            const { error } = await supabase
                .from('meal_plans')
                .delete()
                .eq('user_id', userProfile.id)
                .eq('week_start_date', weekStartStr)
                .eq('day_of_week', dayOfWeek)
                .eq('meal_type', mealType);

            if (error) {
                console.error('Error removing meal:', error);
                return;
            }

            // Refresh meal plans
            fetchWeekMealPlans();
        } catch (err) {
            console.error('Exception removing meal:', err);
        }
    };

    const handleSelectRecipe = async (recipe: Recipe) => {
        if (!userProfile || !selectedSlot) return;

        try {
            const weekStartStr = formatDateForDB(currentWeekStart);

            const { error } = await supabase
                .from('meal_plans')
                .upsert({
                    user_id: userProfile.id,
                    week_start_date: weekStartStr,
                    day_of_week: selectedSlot.day,
                    meal_type: selectedSlot.mealType,
                    recipe_id: recipe.id,
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'user_id,week_start_date,day_of_week,meal_type'
                });

            if (error) {
                console.error('Error saving meal plan:', error);
                return;
            }

            // Close selector and refresh
            setSelectorOpen(false);
            setSelectedSlot(null);
            fetchWeekMealPlans();
        } catch (err) {
            console.error('Exception saving meal plan:', err);
        }
    };

    const handlePreviousWeek = () => {
        setCurrentWeekStart(getPreviousWeek(currentWeekStart));
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(getNextWeek(currentWeekStart));
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)' }}>
                    <div className="text-center p-8">
                        <div className="animate-spin rounded-full h-16 w-16 mx-auto mb-4" style={{ border: '4px solid #FFE5CC', borderTopColor: '#FF9933' }}></div>
                        <p className="text-xl" style={{ color: '#E67E22' }}>Loading your meal calendar...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen py-12" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)' }}>
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold mb-4" style={{
                            background: 'linear-gradient(135deg, #FF9933 0%, #E67E22 50%, #C0392B 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Weekly Meal Calendar
                        </h1>
                        <p className="text-xl" style={{ color: '#8B4513' }}>
                            Plan your meals for the week ahead
                        </p>
                    </div>

                    {/* Week Navigation */}
                    <div
                        className="rounded-lg shadow-lg p-6 mb-8"
                        style={{
                            background: 'white',
                            border: '2px solid #F39C12'
                        }}
                    >
                        <div className="flex justify-between items-center">
                            <button
                                onClick={handlePreviousWeek}
                                className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 shadow-md"
                                style={{
                                    background: 'linear-gradient(135deg, #FF9933 0%, #E67E22 100%)',
                                    color: 'white'
                                }}
                            >
                                ← Previous Week
                            </button>

                            <h2 className="text-2xl font-bold" style={{ color: '#E67E22' }}>
                                {formatWeekRange(currentWeekStart)}
                            </h2>

                            <button
                                onClick={handleNextWeek}
                                className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 shadow-md"
                                style={{
                                    background: 'linear-gradient(135deg, #FF9933 0%, #E67E22 100%)',
                                    color: 'white'
                                }}
                            >
                                Next Week →
                            </button>
                        </div>
                    </div>

                    {/* Calendar */}
                    <div
                        className="rounded-lg shadow-lg p-6"
                        style={{
                            background: 'white',
                            border: '2px solid #F39C12'
                        }}
                    >
                        <WeeklyCalendar
                            weekDates={weekDates}
                            weekMeals={weekMeals}
                            onAddMeal={handleAddMeal}
                            onRemoveMeal={handleRemoveMeal}
                        />
                    </div>

                    {/* Recipe Selector Modal */}
                    {selectorOpen && selectedSlot && (
                        <RecipeSelector
                            mealType={selectedSlot.mealType}
                            onSelect={handleSelectRecipe}
                            onClose={() => {
                                setSelectorOpen(false);
                                setSelectedSlot(null);
                            }}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default MealCalendarPage;
