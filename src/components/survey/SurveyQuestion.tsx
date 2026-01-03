import React from 'react';
import { SurveyQuestion } from '../../types/survey';

interface SurveyQuestionProps {
    question: SurveyQuestion;
    value: string | string[] | undefined;
    onChange: (value: string | string[]) => void;
    error?: string;
}

const SurveyQuestionComponent: React.FC<SurveyQuestionProps> = ({
    question,
    value,
    onChange,
    error
}) => {
    const handleMultiSelectChange = (optionValue: string) => {
        const currentValues = (value as string[]) || [];

        // Handle "none" option - if selected, clear all others
        if (optionValue === 'none') {
            onChange(['none']);
            return;
        }

        // If selecting other options, remove "none"
        const filteredValues = currentValues.filter(v => v !== 'none');

        if (filteredValues.includes(optionValue)) {
            onChange(filteredValues.filter(v => v !== optionValue));
        } else {
            onChange([...filteredValues, optionValue]);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: '#E67E22' }}>
                {question.question}
            </h2>

            {question.type === 'number' && (
                <input
                    type="number"
                    value={value as string || ''}
                    onChange={(e) => onChange(e.target.value)}
                    min={question.validation?.min}
                    max={question.validation?.max}
                    className="w-full px-4 py-3 text-lg rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                    style={{
                        borderColor: error ? '#C0392B' : '#F39C12',
                        color: '#8B4513'
                    }}
                    placeholder={`Enter ${question.id}`}
                />
            )}

            {question.type === 'single-select' && (
                <div className="space-y-3">
                    {question.options?.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-102"
                            style={{
                                borderColor: value === option.value ? '#FF9933' : '#FFE5CC',
                                background: value === option.value
                                    ? 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)'
                                    : 'white'
                            }}
                        >
                            <input
                                type="radio"
                                name={question.id}
                                value={option.value}
                                checked={value === option.value}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-5 h-5 mr-3"
                                style={{ accentColor: '#FF9933' }}
                            />
                            <span className="text-base" style={{ color: '#8B4513' }}>
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>
            )}

            {question.type === 'multi-select' && (
                <div className="space-y-3">
                    {question.options?.map((option) => {
                        const isChecked = ((value as string[]) || []).includes(option.value);
                        return (
                            <label
                                key={option.value}
                                className="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-102"
                                style={{
                                    borderColor: isChecked ? '#FF9933' : '#FFE5CC',
                                    background: isChecked
                                        ? 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)'
                                        : 'white'
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleMultiSelectChange(option.value)}
                                    className="w-5 h-5 mr-3 rounded"
                                    style={{ accentColor: '#FF9933' }}
                                />
                                <span className="text-base" style={{ color: '#8B4513' }}>
                                    {option.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
            )}

            {error && (
                <p className="mt-3 text-sm font-medium" style={{ color: '#C0392B' }}>
                    {error}
                </p>
            )}

            {question.validation && (
                <p className="mt-3 text-sm" style={{ color: '#8B4513', opacity: 0.7 }}>
                    {question.type === 'number' && question.validation.min && question.validation.max && (
                        `Please enter a value between ${question.validation.min} and ${question.validation.max}`
                    )}
                    {question.validation.required && ' (Required)'}
                </p>
            )}
        </div>
    );
};

export default SurveyQuestionComponent;
