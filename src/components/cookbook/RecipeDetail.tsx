import React from 'react';
import { Recipe } from '../../types/recipe';

interface RecipeDetailProps {
    recipe: Recipe;
    onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onClose }) => {
    const totalTime = recipe.prep_time + recipe.cook_time;

    // Calculate Daily Value percentages based on FDA 2000 calorie diet
    const caloriesFromFat = recipe.fat * 9;
    const fatDV = Math.round((recipe.fat / 78) * 100);
    const saturatedFatDV = Math.round((recipe.saturated_fat / 20) * 100);
    const cholesterolDV = Math.round((recipe.cholesterol / 300) * 100);
    const sodiumDV = Math.round((recipe.sodium / 2400) * 100);
    const potassiumDV = Math.round((recipe.potassium / 3500) * 100);
    const carbsDV = Math.round((recipe.carbs / 275) * 100);
    const fiberDV = Math.round((recipe.fiber / 28) * 100);
    const sugarDV = Math.round((recipe.sugar / 50) * 100);
    const proteinDV = Math.round((recipe.protein / 50) * 100);
    const vitaminADV = Math.round((recipe.vitamin_a / 5000) * 100);
    const vitaminCDV = Math.round((recipe.vitamin_c / 60) * 100);
    const calciumDV = Math.round((recipe.calcium / 1000) * 100);
    const ironDV = Math.round((recipe.iron / 18) * 100);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            onClick={onClose}
        >
            <div
                className="max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
                style={{ background: 'white' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className="p-6 sticky top-0 z-10"
                    style={{
                        background: 'linear-gradient(135deg, #FF9933 0%, #E67E22 100%)',
                        borderBottom: '2px solid #F39C12'
                    }}
                >
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <span
                                className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase mb-2"
                                style={{ background: 'white', color: '#E67E22' }}
                            >
                                {recipe.category}
                            </span>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {recipe.title}
                            </h2>
                            <div className="flex items-center space-x-4 text-sm text-white">
                                <div className="flex items-center space-x-1">
                                    <span>⏱️</span>
                                    <span>Prep: {recipe.prep_time} min</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span>🍳</span>
                                    <span>Cook: {recipe.cook_time} min</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span>⏰</span>
                                    <span>Total: {totalTime} min</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-yellow-100 text-3xl font-bold transition-colors"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Dietary Tags */}
                    {recipe.dietary_tags && recipe.dietary_tags.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold mb-3" style={{ color: '#E67E22' }}>
                                Dietary Information
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {recipe.dietary_tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm font-medium"
                                        style={{
                                            background: '#FFE5CC',
                                            color: '#8B4513',
                                            border: '2px solid #F39C12'
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Two-column layout: Ingredients + Nutrition Label */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column: Ingredients */}
                        <div>
                            <h3 className="text-xl font-bold mb-3" style={{ color: '#E67E22' }}>
                                Ingredients
                            </h3>
                            <ul className="space-y-2">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start space-x-2"
                                        style={{ color: '#8B4513' }}
                                    >
                                        <span style={{ color: '#FF9933' }}>•</span>
                                        <span>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column: Complete FDA Nutrition Label */}
                        <div>
                            <div
                                className="border-4 rounded-lg p-4"
                                style={{
                                    borderColor: '#000',
                                    background: 'white',
                                    fontFamily: 'Arial, sans-serif'
                                }}
                            >
                                {/* Header */}
                                <h3 className="text-3xl font-black mb-0" style={{ color: '#000' }}>
                                    Nutrition Facts
                                </h3>
                                <div className="border-b-8 border-black my-1"></div>

                                <div className="text-sm font-bold mb-1" style={{ color: '#000' }}>
                                    Amount Per Serving
                                </div>

                                {/* Calories */}
                                <div className="border-b-4 border-black pb-1 mb-1">
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-bold" style={{ color: '#000' }}>
                                            Calories {recipe.calories}
                                        </span>
                                        <span className="text-sm" style={{ color: '#000' }}>
                                            Calories from Fat {caloriesFromFat}
                                        </span>
                                    </div>
                                </div>

                                {/* Daily Value header */}
                                <div className="text-right text-xs font-bold mb-1" style={{ color: '#000' }}>
                                    % Daily Value*
                                </div>

                                {/* Total Fat */}
                                <div className="flex justify-between items-center py-0.5 border-b border-gray-400">
                                    <div>
                                        <span className="font-bold" style={{ color: '#000' }}>Fat </span>
                                        <span style={{ color: '#000' }}>{recipe.fat}g</span>
                                    </div>
                                    <span className="font-bold" style={{ color: '#000' }}>{fatDV}%</span>
                                </div>

                                {/* Saturated Fat (indented) */}
                                <div className="flex justify-between items-center py-0.5 pl-4 border-b border-gray-400">
                                    <div>
                                        <span style={{ color: '#000' }}>Saturated Fat </span>
                                        <span style={{ color: '#000' }}>{recipe.saturated_fat}g</span>
                                    </div>
                                    <span className="font-bold" style={{ color: '#000' }}>{saturatedFatDV}%</span>
                                </div>

                                {/* Trans Fat (indented, no DV%) */}
                                <div className="flex justify-between items-center py-0.5 pl-4 border-b border-gray-400">
                                    <div>
                                        <span style={{ color: '#000' }}>Trans Fat </span>
                                        <span style={{ color: '#000' }}>{recipe.trans_fat}g</span>
                                    </div>
                                </div>

                                {/* Cholesterol */}
                                <div className="flex justify-between items-center py-0.5 border-b border-gray-400">
                                    <div>
                                        <span className="font-bold" style={{ color: '#000' }}>Cholesterol </span>
                                        <span style={{ color: '#000' }}>{recipe.cholesterol}mg</span>
                                    </div>
                                    <span className="font-bold" style={{ color: '#000' }}>{cholesterolDV}%</span>
                                </div>

                                {/* Sodium */}
                                <div className="flex justify-between items-center py-0.5 border-b border-gray-400">
                                    <div>
                                        <span className="font-bold" style={{ color: '#000' }}>Sodium </span>
                                        <span style={{ color: '#000' }}>{recipe.sodium}mg</span>
                                    </div>
                                    <span className="font-bold" style={{ color: '#000' }}>{sodiumDV}%</span>
                                </div>

                                {/* Potassium */}
                                <div className="flex justify-between items-center py-0.5 border-b border-gray-400">
                                    <div>
                                        <span className="font-bold" style={{ color: '#000' }}>Potassium </span>
                                        <span style={{ color: '#000' }}>{recipe.potassium}mg</span>
                                    </div>
                                    <span className="font-bold" style={{ color: '#000' }}>{potassiumDV}%</span>
                                </div>

                                {/* Total Carbohydrate */}
                                <div className="flex justify-between items-center py-0.5 border-b border-gray-400">
                                    <div>
                                        <span className="font-bold" style={{ color: '#000' }}>Carbohydrates </span>
                                        <span style={{ color: '#000' }}>{recipe.carbs}g</span>
                                    </div>
                                    <span className="font-bold" style={{ color: '#000' }}>{carbsDV}%</span>
                                </div>

                                {/* Fiber (indented) */}
                                <div className="flex justify-between items-center py-0.5 pl-4 border-b border-gray-400">
                                    <div>
                                        <span style={{ color: '#000' }}>Fiber </span>
                                        <span style={{ color: '#000' }}>{recipe.fiber}g</span>
                                    </div>
                                    <span className="font-bold" style={{ color: '#000' }}>{fiberDV}%</span>
                                </div>

                                {/* Sugar (indented) */}
                                <div className="flex justify-between items-center py-0.5 pl-4 border-b border-gray-400">
                                    <div>
                                        <span style={{ color: '#000' }}>Sugar </span>
                                        <span style={{ color: '#000' }}>{recipe.sugar}g</span>
                                    </div>
                                    <span className="font-bold" style={{ color: '#000' }}>{sugarDV}%</span>
                                </div>

                                {/* Protein */}
                                <div className="flex justify-between items-center py-0.5 border-b-4 border-black">
                                    <div>
                                        <span className="font-bold" style={{ color: '#000' }}>Protein </span>
                                        <span style={{ color: '#000' }}>{recipe.protein}g</span>
                                    </div>
                                    <span className="font-bold" style={{ color: '#000' }}>{proteinDV}%</span>
                                </div>

                                {/* Vitamins & Minerals (horizontal layout) */}
                                <div className="mt-2 pt-2 text-sm" style={{ color: '#000' }}>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                        <div className="flex justify-between">
                                            <span>Vitamin A {recipe.vitamin_a}IU</span>
                                            <span className="font-bold">{vitaminADV}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Vitamin C {recipe.vitamin_c}mg</span>
                                            <span className="font-bold">{vitaminCDV}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Calcium {recipe.calcium}mg</span>
                                            <span className="font-bold">{calciumDV}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Iron {recipe.iron}mg</span>
                                            <span className="font-bold">{ironDV}%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer note */}
                                <div className="mt-2 pt-2 border-t-4 border-black text-xs" style={{ color: '#000' }}>
                                    * Percent Daily Values are based on a 2,000 calorie diet.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div>
                        <h3 className="text-xl font-bold mb-3" style={{ color: '#E67E22' }}>
                            Instructions
                        </h3>
                        <ol className="space-y-3">
                            {recipe.instructions.map((instruction, index) => (
                                <li
                                    key={index}
                                    className="flex items-start space-x-3"
                                    style={{ color: '#8B4513' }}
                                >
                                    <span
                                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                        style={{ background: '#FF9933' }}
                                    >
                                        {index + 1}
                                    </span>
                                    <span className="flex-1">{instruction}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Source Link */}
                    {recipe.source_link && (
                        <div className="pt-4 border-t-2" style={{ borderColor: '#FFE5CC' }}>
                            <a
                                href={recipe.source_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-white transition-all hover:scale-105 shadow-md"
                                style={{ background: 'linear-gradient(135deg, #FF9933 0%, #E67E22 100%)' }}
                            >
                                View Original Recipe →
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
