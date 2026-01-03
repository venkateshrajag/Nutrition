import React from 'react';
import { Recipe } from '../../types/mealPlan';
import { MealType } from '../../types/mealPlan';

interface MealSlotProps {
    dayOfWeek: number;
    mealType: MealType;
    recipe: Recipe | null;
    onAddMeal: (dayOfWeek: number, mealType: MealType) => void;
    onRemoveMeal: (dayOfWeek: number, mealType: MealType) => void;
}

const MealSlot: React.FC<MealSlotProps> = ({
    dayOfWeek,
    mealType,
    recipe,
    onAddMeal,
    onRemoveMeal
}) => {
    const getMealIcon = () => {
        switch (mealType) {
            case 'breakfast':
                return '🌅';
            case 'lunch':
                return '🌞';
            case 'dinner':
                return '🌙';
        }
    };

    const getMealColor = () => {
        switch (mealType) {
            case 'breakfast':
                return { bg: '#FFE5CC', border: '#FF9933' };
            case 'lunch':
                return { bg: '#FFF8DC', border: '#F39C12' };
            case 'dinner':
                return { bg: '#FFEFD5', border: '#E67E22' };
        }
    };

    const colors = getMealColor();

    if (!recipe) {
        // Empty slot
        return (
            <div
                onClick={() => onAddMeal(dayOfWeek, mealType)}
                className="p-3 rounded-lg cursor-pointer transition-all hover:scale-105 hover:shadow-md"
                style={{
                    background: colors.bg,
                    border: '2px dashed ' + colors.border,
                    minHeight: '100px'
                }}
            >
                <div className="text-center">
                    <div className="text-2xl mb-1">{getMealIcon()}</div>
                    <div className="text-3xl mb-1" style={{ color: colors.border }}>+</div>
                    <div className="text-xs font-medium" style={{ color: '#8B4513' }}>
                        Add {mealType}
                    </div>
                </div>
            </div>
        );
    }

    // Slot with recipe
    return (
        <div
            className="p-3 rounded-lg transition-all hover:shadow-lg relative group"
            style={{
                background: colors.bg,
                border: '2px solid ' + colors.border,
                minHeight: '100px'
            }}
        >
            {/* Remove button (shows on hover) */}
            <button
                onClick={() => onRemoveMeal(dayOfWeek, mealType)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: '#C0392B', color: 'white' }}
                title="Remove meal"
            >
                ×
            </button>

            <div className="text-lg mb-1">{getMealIcon()}</div>
            <div className="text-sm font-semibold mb-1" style={{ color: '#E67E22' }}>
                {recipe.title}
            </div>
            <div className="text-xs" style={{ color: '#8B4513' }}>
                {recipe.calories} cal • {recipe.protein}g protein
            </div>
            <div className="text-xs mt-1" style={{ color: '#8B4513' }}>
                ⏱️ {recipe.prep_time + recipe.cook_time} min
            </div>
        </div>
    );
};

export default MealSlot;
