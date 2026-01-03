// Nutrition calculation utilities
// Based on standard formulas for BMR, TDEE, and macro distribution

import { SurveyResponses } from '../types/survey';

export interface NutritionCalculations {
    bmr: number;
    tdee: number;
    targetCalories: number;
    macros: {
        protein: number;
        carbs: number;
        fat: number;
    };
}

export interface FeedbackRecommendation {
    category: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
}

export interface NutritionFeedback {
    summary: string;
    recommendations: FeedbackRecommendation[];
    calculations: NutritionCalculations;
}

// Activity level multipliers for TDEE calculation
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
};

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
 * BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age + s
 * where s = +5 for males, -161 for females
 * Note: We'll use a neutral calculation since we don't ask for gender
 */
export function calculateBMR(weight: number, height: number, age: number): number {
    // Using a neutral offset between male (+5) and female (-161)
    const genderOffset = -78; // Average of +5 and -161
    return 10 * weight + 6.25 * height - 5 * age + genderOffset;
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * TDEE = BMR * activity multiplier
 */
export function calculateTDEE(bmr: number, activityLevel: string): number {
    const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
    return bmr * multiplier;
}

/**
 * Calculate target calories based on health goals
 */
export function calculateTargetCalories(tdee: number, healthGoals: string[]): number {
    let targetCalories = tdee;

    if (healthGoals.includes('weight_loss')) {
        targetCalories = tdee - 500; // 0.5kg/week deficit
    } else if (healthGoals.includes('weight_gain') || healthGoals.includes('muscle_gain')) {
        targetCalories = tdee + 300; // Moderate surplus
    }
    // maintenance goal keeps TDEE as is

    return Math.round(targetCalories);
}

/**
 * Calculate macro distribution based on goals
 * Returns grams of protein, carbs, and fat
 */
export function calculateMacros(
    targetCalories: number,
    healthGoals: string[]
): { protein: number; carbs: number; fat: number } {
    let proteinPercent = 25;
    let carbsPercent = 50;
    let fatPercent = 25;

    // Adjust for muscle gain
    if (healthGoals.includes('muscle_gain')) {
        proteinPercent = 30;
        carbsPercent = 45;
        fatPercent = 25;
    }

    // Adjust for weight loss
    if (healthGoals.includes('weight_loss')) {
        proteinPercent = 30;
        carbsPercent = 40;
        fatPercent = 30;
    }

    // Calculate grams (protein: 4 cal/g, carbs: 4 cal/g, fat: 9 cal/g)
    const proteinGrams = Math.round((targetCalories * (proteinPercent / 100)) / 4);
    const carbsGrams = Math.round((targetCalories * (carbsPercent / 100)) / 4);
    const fatGrams = Math.round((targetCalories * (fatPercent / 100)) / 9);

    return {
        protein: proteinGrams,
        carbs: carbsGrams,
        fat: fatGrams
    };
}

/**
 * Generate personalized nutrition feedback based on survey responses
 */
export function generateFeedback(responses: SurveyResponses): NutritionFeedback {
    const age = parseInt(responses.age || '25');
    const weight = parseFloat(responses.weight || '70');
    const height = parseFloat(responses.height || '170');
    const activityLevel = responses.activityLevel || 'moderate';
    const healthGoals = responses.healthGoals || [];
    const waterIntake = responses.waterIntake || '6-8';
    const mealsPerDay = responses.mealsPerDay || '3';

    // Calculate nutrition values
    const bmr = calculateBMR(weight, height, age);
    const tdee = calculateTDEE(bmr, activityLevel);
    const targetCalories = calculateTargetCalories(tdee, healthGoals);
    const macros = calculateMacros(targetCalories, healthGoals);

    const calculations: NutritionCalculations = {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        targetCalories,
        macros
    };

    // Generate recommendations
    const recommendations: FeedbackRecommendation[] = [];

    // Water intake recommendation
    if (waterIntake === '1-2' || waterIntake === '3-5') {
        recommendations.push({
            category: 'Hydration',
            suggestion: 'Increase your water intake to at least 8 glasses per day for optimal hydration and metabolism',
            priority: 'high'
        });
    }

    // Meal frequency recommendation
    if (mealsPerDay === '1-2' && healthGoals.includes('muscle_gain')) {
        recommendations.push({
            category: 'Meal Timing',
            suggestion: 'Consider eating 4-5 smaller meals throughout the day to support muscle growth and maintain energy levels',
            priority: 'high'
        });
    }

    // Protein recommendation for muscle gain
    if (healthGoals.includes('muscle_gain')) {
        recommendations.push({
            category: 'Protein',
            suggestion: `Aim for ${macros.protein}g of protein daily, spread across your meals. Include protein-rich foods like dal, paneer, eggs, and soya chunks`,
            priority: 'high'
        });
    }

    // Weight loss recommendations
    if (healthGoals.includes('weight_loss')) {
        recommendations.push({
            category: 'Calorie Deficit',
            suggestion: `Maintain a daily calorie intake of around ${targetCalories} calories to achieve gradual, sustainable weight loss`,
            priority: 'high'
        });

        recommendations.push({
            category: 'Fiber',
            suggestion: 'Include high-fiber foods like whole grains, vegetables, and legumes to help you feel full longer',
            priority: 'medium'
        });
    }

    // Activity level recommendation
    if (activityLevel === 'sedentary' && healthGoals.includes('health')) {
        recommendations.push({
            category: 'Physical Activity',
            suggestion: 'Try to incorporate at least 30 minutes of moderate exercise 3-4 times per week to improve overall health',
            priority: 'medium'
        });
    }

    // Energy recommendation
    if (healthGoals.includes('energy')) {
        recommendations.push({
            category: 'Energy Levels',
            suggestion: 'Focus on complex carbohydrates like quinoa, oats, and brown rice for sustained energy throughout the day',
            priority: 'medium'
        });
    }

    // Dietary restrictions note
    if (responses.dietaryRestrictions && responses.dietaryRestrictions.length > 0 && !responses.dietaryRestrictions.includes('none')) {
        const restrictions = responses.dietaryRestrictions.join(', ');
        recommendations.push({
            category: 'Dietary Preferences',
            suggestion: `Our cookbook includes recipes that match your ${restrictions} preferences. Check the Cookbook section for suitable options`,
            priority: 'low'
        });
    }

    // Generate summary
    const goalText = healthGoals.length > 0
        ? healthGoals.map(g => g.replace('_', ' ')).join(', ')
        : 'maintain your current health';

    const summary = `Based on your profile (${age} years, ${weight}kg, ${height}cm, ${activityLevel} activity level), your daily calorie target is ${targetCalories} calories to ${goalText}. Focus on balanced nutrition with ${macros.protein}g protein, ${macros.carbs}g carbs, and ${macros.fat}g fat daily.`;

    return {
        summary,
        recommendations,
        calculations
    };
}
