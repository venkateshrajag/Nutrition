import React from 'react';
import { Recipe } from '../../types/recipe';

interface RecipeCardProps {
    recipe: Recipe;
    onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
    const totalTime = recipe.prep_time + recipe.cook_time;

    return (
        <div
            onClick={onClick}
            className="rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-xl"
            style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8DC 100%)',
                border: '2px solid #F39C12'
            }}
        >
            {/* Category Badge */}
            <div className="p-4 pb-0">
                <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase"
                    style={{
                        background: recipe.category === 'breakfast' ? '#FF9933' : recipe.category === 'lunch' ? '#F39C12' : '#E67E22',
                        color: 'white'
                    }}
                >
                    {recipe.category}
                </span>
            </div>

            {/* Recipe Info */}
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#E67E22' }}>
                    {recipe.title}
                </h3>

                {/* Time and Calories */}
                <div className="flex items-center space-x-4 mb-3 text-sm" style={{ color: '#8B4513' }}>
                    <div className="flex items-center space-x-1">
                        <span>⏱️</span>
                        <span>{totalTime} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span>🔥</span>
                        <span>{recipe.calories} cal</span>
                    </div>
                </div>

                {/* Macros */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center p-2 rounded" style={{ background: '#FFE5CC' }}>
                        <p className="text-xs" style={{ color: '#8B4513' }}>Protein</p>
                        <p className="font-bold" style={{ color: '#E67E22' }}>{recipe.protein}g</p>
                    </div>
                    <div className="text-center p-2 rounded" style={{ background: '#FFE5CC' }}>
                        <p className="text-xs" style={{ color: '#8B4513' }}>Carbs</p>
                        <p className="font-bold" style={{ color: '#E67E22' }}>{recipe.carbs}g</p>
                    </div>
                    <div className="text-center p-2 rounded" style={{ background: '#FFE5CC' }}>
                        <p className="text-xs" style={{ color: '#8B4513' }}>Fat</p>
                        <p className="font-bold" style={{ color: '#E67E22' }}>{recipe.fat}g</p>
                    </div>
                </div>

                {/* Dietary Tags */}
                {recipe.dietary_tags && recipe.dietary_tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {recipe.dietary_tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 rounded-full text-xs"
                                style={{
                                    background: '#FFF8DC',
                                    color: '#8B4513',
                                    border: '1px solid #F39C12'
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeCard;
