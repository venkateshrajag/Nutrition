import React, { useState } from 'react';
import { surveyQuestions, SurveyResponses } from '../../types/survey';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import ProgressBar from './ProgressBar';
import SurveyQuestionComponent from './SurveyQuestion';
import Layout from '../layout/Layout';

const SurveyForm: React.FC = () => {
    const { user, userProfile } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState<SurveyResponses>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentQuestion = surveyQuestions[currentStep];

    const validateCurrentQuestion = (): boolean => {
        const value = responses[currentQuestion.id as keyof SurveyResponses];

        if (currentQuestion.validation?.required) {
            if (!value || (Array.isArray(value) && value.length === 0)) {
                setErrors({ [currentQuestion.id]: 'This field is required' });
                return false;
            }
        }

        if (currentQuestion.type === 'number' && value) {
            const numValue = Number(value);
            if (currentQuestion.validation?.min && numValue < currentQuestion.validation.min) {
                setErrors({ [currentQuestion.id]: `Value must be at least ${currentQuestion.validation.min}` });
                return false;
            }
            if (currentQuestion.validation?.max && numValue > currentQuestion.validation.max) {
                setErrors({ [currentQuestion.id]: `Value must be at most ${currentQuestion.validation.max}` });
                return false;
            }
        }

        setErrors({});
        return true;
    };

    const handleNext = () => {
        if (!validateCurrentQuestion()) {
            return;
        }

        if (currentStep < surveyQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setErrors({});
        }
    };

    const handleChange = (value: string | string[]) => {
        setResponses({
            ...responses,
            [currentQuestion.id]: value
        });
        // Clear error when user starts typing/selecting
        if (errors[currentQuestion.id]) {
            setErrors({});
        }
    };

    const handleSubmit = async () => {
        if (!user || !userProfile) {
            console.error('No user logged in');
            return;
        }

        setIsSubmitting(true);

        try {
            console.log('Submitting survey for user:', userProfile.id);
            console.log('Survey responses:', responses);

            // Insert survey responses and get the inserted data back
            const { data: surveyData, error: surveyError } = await supabase
                .from('surveys')
                .insert({
                    user_id: userProfile.id,
                    responses: responses
                })
                .select()
                .single();

            if (surveyError) {
                console.error('Error saving survey:', surveyError);
                alert('Failed to save survey. Please try again.');
                setIsSubmitting(false);
                return;
            }

            // Confirm survey was persisted
            if (!surveyData) {
                console.error('Survey data not returned after insert');
                alert('Failed to confirm survey was saved. Please try again.');
                setIsSubmitting(false);
                return;
            }

            console.log('✅ Survey successfully persisted to database:', surveyData);

            // Update user profile to mark survey as completed
            const { data: userData, error: updateError } = await supabase
                .from('users')
                .update({ has_completed_survey: true })
                .eq('id', userProfile.id)
                .select()
                .single();

            if (updateError) {
                console.error('Error updating user profile:', updateError);
                // Continue anyway since survey was saved
            } else {
                console.log('✅ User profile updated successfully:', userData);
            }

            console.log('✅ Survey submission complete. Navigating to dashboard...');

            // Wait a moment for the database update to propagate, then navigate with reload
            // This ensures the useAuth hook fetches the updated profile
            await new Promise(resolve => setTimeout(resolve, 500));

            // Navigate to dashboard with a full page reload to refresh auth state
            window.location.href = '/dashboard';
        } catch (err) {
            console.error('Exception during survey submission:', err);
            alert('An error occurred. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen py-12" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)' }}>
                <div className="max-w-3xl mx-auto px-4">
                    <div
                        className="rounded-lg shadow-2xl p-8 md:p-12"
                        style={{
                            background: 'white',
                            border: '2px solid #F39C12'
                        }}
                    >
                        <h1 className="text-4xl font-bold mb-2 text-center" style={{ color: '#E67E22' }}>
                            Nutrition Survey
                        </h1>
                        <p className="text-center mb-8" style={{ color: '#8B4513' }}>
                            Help us personalize your nutrition recommendations
                        </p>

                        <ProgressBar currentStep={currentStep} totalSteps={surveyQuestions.length} />

                        <div className="mb-8">
                            <SurveyQuestionComponent
                                question={currentQuestion}
                                value={responses[currentQuestion.id as keyof SurveyResponses]}
                                onChange={handleChange}
                                error={errors[currentQuestion.id]}
                            />
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t-2" style={{ borderColor: '#FFE5CC' }}>
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className="px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: currentStep === 0 ? '#E0E0E0' : 'white',
                                    border: '2px solid #F39C12',
                                    color: '#E67E22'
                                }}
                            >
                                ← Back
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={isSubmitting}
                                className="px-6 py-3 rounded-lg font-medium text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                style={{
                                    background: 'linear-gradient(135deg, #FF9933 0%, #E67E22 100%)'
                                }}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : currentStep === surveyQuestions.length - 1 ? (
                                    'Complete Survey →'
                                ) : (
                                    'Next →'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SurveyForm;
