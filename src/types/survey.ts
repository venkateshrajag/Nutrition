// Survey question types and interfaces

export interface SurveyQuestion {
    id: string;
    type: 'number' | 'single-select' | 'multi-select';
    question: string;
    validation?: {
        min?: number;
        max?: number;
        required?: boolean;
    };
    options?: Array<{
        value: string;
        label: string;
    }>;
}

export interface SurveyResponses {
    age?: string;
    weight?: string;
    height?: string;
    activityLevel?: string;
    dietaryRestrictions?: string[];
    healthGoals?: string[];
    mealsPerDay?: string;
    waterIntake?: string;
    allergies?: string[];
}

export const surveyQuestions: SurveyQuestion[] = [
    {
        id: 'age',
        type: 'number',
        question: 'What is your age?',
        validation: { min: 13, max: 120, required: true }
    },
    {
        id: 'weight',
        type: 'number',
        question: 'What is your current weight (kg)?',
        validation: { min: 30, max: 300, required: true }
    },
    {
        id: 'height',
        type: 'number',
        question: 'What is your height (cm)?',
        validation: { min: 100, max: 250, required: true }
    },
    {
        id: 'activityLevel',
        type: 'single-select',
        question: 'How would you describe your activity level?',
        validation: { required: true },
        options: [
            { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
            { value: 'light', label: 'Light (exercise 1-3 days/week)' },
            { value: 'moderate', label: 'Moderate (exercise 3-5 days/week)' },
            { value: 'active', label: 'Active (exercise 6-7 days/week)' },
            { value: 'very_active', label: 'Very Active (intense exercise daily)' }
        ]
    },
    {
        id: 'dietaryRestrictions',
        type: 'multi-select',
        question: 'Do you follow any dietary restrictions?',
        options: [
            { value: 'none', label: 'None' },
            { value: 'vegan', label: 'Vegan' },
            { value: 'keto', label: 'Keto' },
            { value: 'gluten_free', label: 'Gluten-Free' },
            { value: 'dairy_free', label: 'Dairy-Free' },
            { value: 'halal', label: 'Halal' },
            { value: 'kosher', label: 'Kosher' }
        ]
    },
    {
        id: 'healthGoals',
        type: 'multi-select',
        question: 'What are your health goals?',
        validation: { required: true },
        options: [
            { value: 'weight_loss', label: 'Lose weight' },
            { value: 'weight_gain', label: 'Gain weight' },
            { value: 'muscle_gain', label: 'Build muscle' },
            { value: 'maintenance', label: 'Maintain current weight' },
            { value: 'energy', label: 'Increase energy' },
            { value: 'health', label: 'Improve overall health' }
        ]
    },
    {
        id: 'mealsPerDay',
        type: 'single-select',
        question: 'How many meals do you typically eat per day?',
        validation: { required: true },
        options: [
            { value: '1-2', label: '1-2 meals' },
            { value: '3', label: '3 meals' },
            { value: '4-5', label: '4-5 meals' },
            { value: '6+', label: '6 or more meals' }
        ]
    },
    {
        id: 'waterIntake',
        type: 'single-select',
        question: 'How much water do you drink daily?',
        validation: { required: true },
        options: [
            { value: '1-2', label: '1-2 glasses' },
            { value: '3-5', label: '3-5 glasses' },
            { value: '6-8', label: '6-8 glasses' },
            { value: '8+', label: 'More than 8 glasses' }
        ]
    },
    {
        id: 'allergies',
        type: 'multi-select',
        question: 'Do you have any food allergies?',
        options: [
            { value: 'none', label: 'None' },
            { value: 'nuts', label: 'Nuts' },
            { value: 'shellfish', label: 'Shellfish' },
            { value: 'eggs', label: 'Eggs' },
            { value: 'dairy', label: 'Dairy' },
            { value: 'soy', label: 'Soy' },
            { value: 'wheat', label: 'Wheat' },
            { value: 'other', label: 'Other' }
        ]
    }
];
