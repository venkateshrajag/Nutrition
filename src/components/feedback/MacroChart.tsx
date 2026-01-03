import React from 'react';

interface MacroChartProps {
    protein: number;
    carbs: number;
    fat: number;
}

const MacroChart: React.FC<MacroChartProps> = ({ protein, carbs, fat }) => {
    // Calculate total and percentages
    const proteinCal = protein * 4;
    const carbsCal = carbs * 4;
    const fatCal = fat * 9;
    const total = proteinCal + carbsCal + fatCal;

    const proteinPercent = Math.round((proteinCal / total) * 100);
    const carbsPercent = Math.round((carbsCal / total) * 100);
    const fatPercent = Math.round((fatCal / total) * 100);

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#E67E22' }}>
                Daily Macro Distribution
            </h3>

            {/* Protein */}
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: '#8B4513' }}>
                        Protein
                    </span>
                    <span className="text-sm font-medium" style={{ color: '#8B4513' }}>
                        {protein}g ({proteinPercent}%)
                    </span>
                </div>
                <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: '#FFE5CC' }}>
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${proteinPercent}%`,
                            background: '#FF9933'
                        }}
                    />
                </div>
            </div>

            {/* Carbs */}
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: '#8B4513' }}>
                        Carbohydrates
                    </span>
                    <span className="text-sm font-medium" style={{ color: '#8B4513' }}>
                        {carbs}g ({carbsPercent}%)
                    </span>
                </div>
                <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: '#FFE5CC' }}>
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${carbsPercent}%`,
                            background: '#F39C12'
                        }}
                    />
                </div>
            </div>

            {/* Fat */}
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: '#8B4513' }}>
                        Fat
                    </span>
                    <span className="text-sm font-medium" style={{ color: '#8B4513' }}>
                        {fat}g ({fatPercent}%)
                    </span>
                </div>
                <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: '#FFE5CC' }}>
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${fatPercent}%`,
                            background: '#E67E22'
                        }}
                    />
                </div>
            </div>

            {/* Total Calories */}
            <div className="mt-6 p-4 rounded-lg" style={{ background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)', border: '2px solid #F39C12' }}>
                <div className="text-center">
                    <p className="text-sm" style={{ color: '#8B4513' }}>Total Daily Calories</p>
                    <p className="text-3xl font-bold" style={{ color: '#E67E22' }}>
                        {Math.round(total)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MacroChart;
