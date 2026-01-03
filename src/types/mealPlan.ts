// Meal Plan TypeScript Interfaces

export interface MealPlan {
    id: string;
    user_id: string;
    week_start_date: string; // ISO date string (YYYY-MM-DD)
    day_of_week: number; // 0=Sunday, 6=Saturday
    meal_type: 'breakfast' | 'lunch' | 'dinner';
    recipe_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface MealPlanWithRecipe extends MealPlan {
    recipe: Recipe | null;
}

export interface DayMeals {
    breakfast: MealPlanWithRecipe | null;
    lunch: MealPlanWithRecipe | null;
    dinner: MealPlanWithRecipe | null;
}

export interface WeekMealPlan {
    weekStartDate: Date;
    meals: {
        [day: number]: DayMeals; // 0-6 for Sunday-Saturday
    };
}

export interface DailyNutrition {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
}

export interface WeeklyNutrition {
    daily: {
        [day: number]: DailyNutrition;
    };
    total: DailyNutrition;
    average: DailyNutrition;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';

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
    saturated_fat: number;
    trans_fat: number;
    cholesterol: number;
    sodium: number;
    potassium: number;
    sugar: number;
    vitamin_a: number;
    vitamin_c: number;
    calcium: number;
    iron: number;
    ingredients: string[];
    instructions: string[];
    dietary_tags: string[];
    source_link: string;
}
