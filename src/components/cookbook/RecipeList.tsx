import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Recipe } from '../../types/recipe';
import RecipeCard from './RecipeCard';
import RecipeFilters from './RecipeFilters';
import RecipeDetail from './RecipeDetail';

const RecipeList: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Detail modal state
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    // Fetch recipes from Supabase
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const { data, error } = await supabase
                    .from('recipes')
                    .select('*')
                    .order('category', { ascending: true })
                    .order('title', { ascending: true });

                if (error) {
                    console.error('Error fetching recipes:', error);
                    setError('Failed to load recipes');
                    setLoading(false);
                    return;
                }

                setRecipes(data || []);
                setFilteredRecipes(data || []);
                setLoading(false);
            } catch (err) {
                console.error('Exception fetching recipes:', err);
                setError('Failed to load recipes');
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    // Apply filters whenever filter states change
    useEffect(() => {
        let filtered = [...recipes];

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(recipe => recipe.category === selectedCategory);
        }

        // Dietary tags filter (recipe must have ALL selected tags)
        if (selectedTags.length > 0) {
            filtered = filtered.filter(recipe =>
                selectedTags.every(tag => recipe.dietary_tags?.includes(tag))
            );
        }

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(recipe =>
                recipe.title.toLowerCase().includes(query) ||
                recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
            );
        }

        setFilteredRecipes(filtered);
    }, [recipes, selectedCategory, selectedTags, searchQuery]);

    const handleTagToggle = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)' }}>
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-16 w-16 mx-auto mb-4" style={{ border: '4px solid #FFE5CC', borderTopColor: '#FF9933' }}></div>
                    <p className="text-xl" style={{ color: '#E67E22' }}>Loading recipes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)' }}>
                <div className="text-center p-8">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold mb-4" style={{ color: '#E67E22' }}>
                        {error}
                    </h2>
                </div>
            </div>
        );
    }

    return (
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
                        Indian Recipe Cookbook
                    </h1>
                    <p className="text-xl" style={{ color: '#8B4513' }}>
                        Discover {recipes.length} healthy and delicious Indian recipes
                    </p>
                </div>

                {/* Filters */}
                <div
                    className="rounded-lg shadow-lg p-6 mb-8"
                    style={{
                        background: 'white',
                        border: '2px solid #F39C12'
                    }}
                >
                    <RecipeFilters
                        selectedCategory={selectedCategory}
                        selectedTags={selectedTags}
                        searchQuery={searchQuery}
                        onCategoryChange={setSelectedCategory}
                        onTagToggle={handleTagToggle}
                        onSearchChange={setSearchQuery}
                    />
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-lg font-medium" style={{ color: '#E67E22' }}>
                        Showing {filteredRecipes.length} of {recipes.length} recipes
                    </p>
                </div>

                {/* Recipe Grid */}
                {filteredRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                onClick={() => setSelectedRecipe(recipe)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold mb-2" style={{ color: '#E67E22' }}>
                            No recipes found
                        </h3>
                        <p style={{ color: '#8B4513' }}>
                            Try adjusting your filters or search query
                        </p>
                    </div>
                )}

                {/* Recipe Detail Modal */}
                {selectedRecipe && (
                    <RecipeDetail
                        recipe={selectedRecipe}
                        onClose={() => setSelectedRecipe(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default RecipeList;
