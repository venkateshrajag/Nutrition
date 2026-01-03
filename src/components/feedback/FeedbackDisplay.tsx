import React from 'react';
import { NutritionFeedback } from '../../utils/nutritionCalculations';
import MacroChart from './MacroChart';

interface FeedbackDisplayProps {
    feedback: NutritionFeedback;
    surveyDate: string;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, surveyDate }) => {
    const priorityColors = {
        high: '#C0392B',
        medium: '#E67E22',
        low: '#F39C12'
    };

    const priorityIcons = {
        high: '🔴',
        medium: '🟠',
        low: '🟡'
    };

    return (
        <div className="space-y-6">
            {/* Summary Card */}
            <div
                className="rounded-lg shadow-lg p-6"
                style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8DC 100%)',
                    border: '2px solid #FF9933'
                }}
            >
                <div className="flex items-start space-x-3 mb-4">
                    <span className="text-3xl">📊</span>
                    <div>
                        <h2 className="text-2xl font-bold mb-2" style={{ color: '#E67E22' }}>
                            Your Personalized Nutrition Plan
                        </h2>
                        <p className="text-sm" style={{ color: '#8B4513', opacity: 0.8 }}>
                            Based on your survey from {new Date(surveyDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <p className="text-base leading-relaxed" style={{ color: '#8B4513' }}>
                    {feedback.summary}
                </p>
            </div>

            {/* Calculations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                    className="rounded-lg shadow-md p-6 text-center"
                    style={{
                        background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                        border: '2px solid #FF9933'
                    }}
                >
                    <p className="text-sm mb-2" style={{ color: '#8B4513' }}>Basal Metabolic Rate</p>
                    <p className="text-3xl font-bold" style={{ color: '#E67E22' }}>
                        {feedback.calculations.bmr}
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#8B4513', opacity: 0.7 }}>calories/day</p>
                </div>

                <div
                    className="rounded-lg shadow-md p-6 text-center"
                    style={{
                        background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                        border: '2px solid #F39C12'
                    }}
                >
                    <p className="text-sm mb-2" style={{ color: '#8B4513' }}>Total Daily Energy</p>
                    <p className="text-3xl font-bold" style={{ color: '#E67E22' }}>
                        {feedback.calculations.tdee}
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#8B4513', opacity: 0.7 }}>calories/day</p>
                </div>

                <div
                    className="rounded-lg shadow-md p-6 text-center"
                    style={{
                        background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                        border: '2px solid #C0392B'
                    }}
                >
                    <p className="text-sm mb-2" style={{ color: '#8B4513' }}>Target Calories</p>
                    <p className="text-3xl font-bold" style={{ color: '#E67E22' }}>
                        {feedback.calculations.targetCalories}
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#8B4513', opacity: 0.7 }}>calories/day</p>
                </div>
            </div>

            {/* Macro Chart */}
            <div
                className="rounded-lg shadow-lg p-6"
                style={{
                    background: 'white',
                    border: '2px solid #F39C12'
                }}
            >
                <MacroChart
                    protein={feedback.calculations.macros.protein}
                    carbs={feedback.calculations.macros.carbs}
                    fat={feedback.calculations.macros.fat}
                />
            </div>

            {/* Recommendations */}
            <div
                className="rounded-lg shadow-lg p-6"
                style={{
                    background: 'white',
                    border: '2px solid #FF9933'
                }}
            >
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#E67E22' }}>
                    Personalized Recommendations
                </h3>
                <div className="space-y-4">
                    {feedback.recommendations.map((rec, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-lg transition-transform hover:scale-102"
                            style={{
                                background: 'linear-gradient(135deg, #FFF8DC 0%, #FFFFFF 100%)',
                                border: `2px solid ${priorityColors[rec.priority]}`,
                                borderLeft: `6px solid ${priorityColors[rec.priority]}`
                            }}
                        >
                            <div className="flex items-start space-x-3">
                                <span className="text-2xl">{priorityIcons[rec.priority]}</span>
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-1" style={{ color: '#E67E22' }}>
                                        {rec.category}
                                    </h4>
                                    <p className="text-sm" style={{ color: '#8B4513' }}>
                                        {rec.suggestion}
                                    </p>
                                    <span
                                        className="inline-block mt-2 px-2 py-1 text-xs rounded-full"
                                        style={{
                                            background: priorityColors[rec.priority],
                                            color: 'white'
                                        }}
                                    >
                                        {rec.priority.toUpperCase()} PRIORITY
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeedbackDisplay;
