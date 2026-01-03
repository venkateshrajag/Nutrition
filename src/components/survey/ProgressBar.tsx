import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const percentage = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: '#E67E22' }}>
                    Question {currentStep + 1} of {totalSteps}
                </span>
                <span className="text-sm font-medium" style={{ color: '#E67E22' }}>
                    {Math.round(percentage)}%
                </span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: '#FFE5CC' }}>
                <div
                    className="h-full transition-all duration-300 ease-out rounded-full"
                    style={{
                        width: `${percentage}%`,
                        background: 'linear-gradient(90deg, #FF9933 0%, #E67E22 50%, #F39C12 100%)'
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
