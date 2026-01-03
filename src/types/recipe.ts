// Recipe type definitions

export interface Recipe {
    id: string;
    title: string;
    category: string;
    prep_time: number;
    cook_time: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    ingredients: string[];
    instructions: string[];
    dietary_tags: string[];
    source_link: string;
}
