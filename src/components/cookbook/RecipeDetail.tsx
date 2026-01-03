import React from 'react';
import { Recipe } from '../../types/recipe';

interface RecipeDetailProps {
    recipe: Recipe;
    onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onClose }) => {
    const totalTime = recipe.prep_time + recipe.cook_time;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            onClick={onClose}
        >
            <div
                className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
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
                    {/* Nutrition Info */}
                    <div
                        className="rounded-lg p-4"
                        style={{
                            background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                            border: '2px solid #F39C12'
                        }}
                    >
                        <h3 className="text-xl font-bold mb-3" style={{ color: '#E67E22' }}>
                            Nutrition Facts
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div className="text-center">
                                <p className="text-sm" style={{ color: '#8B4513' }}>Calories</p>
                                <p className="text-2xl font-bold" style={{ color: '#E67E22' }}>{recipe.calories}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm" style={{ color: '#8B4513' }}>Protein</p>
                                <p className="text-2xl font-bold" style={{ color: '#E67E22' }}>{recipe.protein}g</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm" style={{ color: '#8B4513' }}>Carbs</p>
                                <p className="text-2xl font-bold" style={{ color: '#E67E22' }}>{recipe.carbs}g</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm" style={{ color: '#8B4513' }}>Fat</p>
                                <p className="text-2xl font-bold" style={{ color: '#E67E22' }}>{recipe.fat}g</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm" style={{ color: '#8B4513' }}>Fiber</p>
                                <p className="text-2xl font-bold" style={{ color: '#E67E22' }}>{recipe.fiber}g</p>
                            </div>
                        </div>
                    </div>

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

                    {/* Ingredients */}
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
