// Recipe type definitions

export interface Recipe {
    id: string;
    title: string;
    category: string;
    prep_time: number;
    cook_time: number;

    // Basic nutrition
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;

    // Extended nutrition fields
    saturated_fat: number;      // grams
    trans_fat: number;          // grams
    cholesterol: number;        // milligrams
    sodium: number;             // milligrams
    potassium: number;          // milligrams
    sugar: number;              // grams
    vitamin_a: number;          // IU (International Units)
    vitamin_c: number;          // milligrams
    calcium: number;            // milligrams
    iron: number;               // milligrams

    ingredients: string[];
    instructions: string[];
    dietary_tags: string[];
    source_link: string;
}

