import React from 'react';

interface RecipeFiltersProps {
    selectedCategory: string;
    selectedTags: string[];
    searchQuery: string;
    onCategoryChange: (category: string) => void;
    onTagToggle: (tag: string) => void;
    onSearchChange: (query: string) => void;
}

const CATEGORIES = ['all', 'breakfast', 'lunch', 'dinner'];
const DIETARY_TAGS = ['vegetarian', 'vegan', 'high-protein', 'low-carb', 'gluten-free'];

const RecipeFilters: React.FC<RecipeFiltersProps> = ({
    selectedCategory,
    selectedTags,
    searchQuery,
    onCategoryChange,
    onTagToggle,
    onSearchChange
}) => {
    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div>
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                    style={{
                        borderColor: '#F39C12',
                        color: '#8B4513'
                    }}
                />
            </div>

            {/* Category Filter */}
            <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#E67E22' }}>
                    Category
                </h3>
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                            style={{
                                background: selectedCategory === category
                                    ? 'linear-gradient(135deg, #FF9933 0%, #E67E22 100%)'
                                    : 'white',
                                color: selectedCategory === category ? 'white' : '#E67E22',
                                border: `2px solid ${selectedCategory === category ? '#FF9933' : '#F39C12'}`
                            }}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dietary Tags Filter */}
            <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#E67E22' }}>
                    Dietary Preferences
                </h3>
                <div className="flex flex-wrap gap-2">
                    {DIETARY_TAGS.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                            <button
                                key={tag}
                                onClick={() => onTagToggle(tag)}
                                className="px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                                style={{
                                    background: isSelected
                                        ? 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)'
                                        : 'white',
                                    color: '#8B4513',
                                    border: `2px solid ${isSelected ? '#FF9933' : '#FFE5CC'}`
                                }}
                            >
                                {tag}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RecipeFilters;
