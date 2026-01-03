import React from 'react';
import { DayMeals, MealType } from '../../types/mealPlan';
import { getDayNameShort, formatDateShort, isToday as checkIsToday } from '../../utils/dateUtils';
import MealSlot from './MealSlot';

interface WeeklyCalendarProps {
    weekDates: Date[];
    weekMeals: { [day: number]: DayMeals };
    onAddMeal: (dayOfWeek: number, mealType: MealType) => void;
    onRemoveMeal: (dayOfWeek: number, mealType: MealType) => void;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
    weekDates,
    weekMeals,
    onAddMeal,
    onRemoveMeal
}) => {
    const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner'];

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[800px]">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {weekDates.map((date, index) => {
                        const isCurrentDay = checkIsToday(date);
                        return (
                            <div
                                key={index}
                                className="text-center p-3 rounded-lg"
                                style={{
                                    background: isCurrentDay ? 'linear-gradient(135deg, #FF9933 0%, #E67E22 100%)' : '#FFF8DC',
                                    border: `2px solid ${isCurrentDay ? '#FF9933' : '#F39C12'}`,
                                    color: isCurrentDay ? 'white' : '#E67E22'
                                }}
                            >
                                <div className="font-bold">{getDayNameShort(index)}</div>
                                <div className="text-sm">{formatDateShort(date)}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Meal Rows */}
                {mealTypes.map((mealType) => (
                    <div key={mealType} className="mb-4">
                        <div className="grid grid-cols-7 gap-2">
                            {weekDates.map((_, dayIndex) => {
                                const dayMeals = weekMeals[dayIndex] || { breakfast: null, lunch: null, dinner: null };
                                const mealPlan = dayMeals[mealType];
                                const recipe = mealPlan?.recipe || null;

                                return (
                                    <MealSlot
                                        key={`${dayIndex}-${mealType}`}
                                        dayOfWeek={dayIndex}
                                        mealType={mealType}
                                        recipe={recipe}
                                        onAddMeal={onAddMeal}
                                        onRemoveMeal={onRemoveMeal}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyCalendar;
