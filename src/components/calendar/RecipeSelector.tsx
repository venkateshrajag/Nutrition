import React, { useState, useEffect } from 'react';
import { Recipe, MealType } from '../../types/mealPlan';
import { supabase } from '../../lib/supabase';

interface RecipeSelectorProps {
    mealType: MealType;
    onSelect: (recipe: Recipe) => void;
    onClose: () => void;
}

const RecipeSelector: React.FC<RecipeSelectorProps> = ({ mealType, onSelect, onClose }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecipes();
    }, [mealType]);

    useEffect(() => {
        filterRecipes();
    }, [recipes, searchQuery]);

    const fetchRecipes = async () => {
        try {
            const { data, error } = await supabase
                .from('recipes')
                .select('*')
                .eq('category', mealType)
                .order('title', { ascending: true });

            if (error) {
                console.error('Error fetching recipes:', error);
                return;
            }

            setRecipes(data || []);
            setLoading(false);
        } catch (err) {
            console.error('Exception fetching recipes:', err);
            setLoading(false);
        }
    };

    const filterRecipes = () => {
        if (!searchQuery.trim()) {
            setFilteredRecipes(recipes);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(query) ||
            recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
        );
        setFilteredRecipes(filtered);
    };

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
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">
                            Select {mealType.charAt(0).toUpperCase() + mealType.slice(1)} Recipe
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-yellow-100 text-3xl font-bold transition-colors"
                        >
                            ×
                        </button>
                    </div>

                    {/* Search */}
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg"
                            style={{ border: '2px solid #F39C12' }}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 mx-auto mb-4" style={{ border: '4px solid #FFE5CC', borderTopColor: '#FF9933' }}></div>
                            <p style={{ color: '#E67E22' }}>Loading recipes...</p>
                        </div>
                    ) : filteredRecipes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredRecipes.map((recipe) => (
                                <div
                                    key={recipe.id}
                                    onClick={() => onSelect(recipe)}
                                    className="p-4 rounded-lg cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
                                    style={{
                                        background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)',
                                        border: '2px solid #F39C12'
                                    }}
                                >
                                    <h3 className="font-bold mb-2" style={{ color: '#E67E22' }}>
                                        {recipe.title}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2 text-sm" style={{ color: '#8B4513' }}>
                                        <div>🔥 {recipe.calories} cal</div>
                                        <div>💪 {recipe.protein}g protein</div>
                                        <div>⏱️ {recipe.prep_time + recipe.cook_time} min</div>
                                        <div>🥗 {recipe.carbs}g carbs</div>
                                    </div>
                                    {recipe.dietary_tags && recipe.dietary_tags.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {recipe.dietary_tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-0.5 rounded-full text-xs"
                                                    style={{ background: '#FFE5CC', color: '#8B4513' }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold mb-2" style={{ color: '#E67E22' }}>
                                No recipes found
                            </h3>
                            <p style={{ color: '#8B4513' }}>
                                Try adjusting your search query
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeSelector;
