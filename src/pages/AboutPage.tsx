import React from 'react';
import Layout from '../components/layout/Layout';

const AboutPage: React.FC = () => {
    return (
        <Layout>
            <div className="min-h-screen py-12" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)' }}>
                <div className="max-w-4xl mx-auto px-4">
                    <div
                        className="rounded-lg shadow-2xl p-8 md:p-12"
                        style={{
                            background: 'white',
                            border: '2px solid #F39C12'
                        }}
                    >
                        {/* Header */}
                        <h1 className="text-5xl font-bold mb-6 text-center" style={{
                            background: 'linear-gradient(135deg, #FF9933 0%, #E67E22 50%, #C0392B 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            About Saffron Suvai
                        </h1>

                        {/* Mission Statement */}
                        <div className="space-y-6" style={{ color: '#8B4513' }}>
                            <div className="text-lg leading-relaxed">
                                <p className="mb-4">
                                    My product goal is to design a <span className="font-semibold" style={{ color: '#E67E22' }}>vegetarian meal plan inspired by Indian cuisine</span> that supports the needs of a student athlete like myself.
                                </p>

                                <p className="mb-4">
                                    The plan will focus on <span className="font-semibold" style={{ color: '#E67E22' }}>increasing protein intake</span> and meeting key nutrition goals while staying plant-based. It will also highlight foods that may enhance <span className="font-semibold" style={{ color: '#E67E22' }}>cognitive function</span> (such as focus, memory, and reaction time) and support <span className="font-semibold" style={{ color: '#E67E22' }}>athletic performance</span> (energy, recovery, and endurance).
                                </p>

                                <p>
                                    By combining traditional Indian flavors with modern sports nutrition, this meal plan will provide a <span className="font-semibold" style={{ color: '#E67E22' }}>practical, culturally rich, and performance-oriented guide</span> for student athletes.
                                </p>
                            </div>

                            {/* Key Features */}
                            <div className="mt-8 pt-8 border-t-2" style={{ borderColor: '#FFE5CC' }}>
                                <h2 className="text-2xl font-bold mb-4" style={{ color: '#E67E22' }}>
                                    Key Features
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-lg" style={{ background: '#FFF8DC', border: '2px solid #F39C12' }}>
                                        <div className="text-3xl mb-2">🥗</div>
                                        <h3 className="font-bold mb-1" style={{ color: '#E67E22' }}>Plant-Based Nutrition</h3>
                                        <p className="text-sm">High-protein vegetarian recipes inspired by Indian cuisine</p>
                                    </div>

                                    <div className="p-4 rounded-lg" style={{ background: '#FFF8DC', border: '2px solid #F39C12' }}>
                                        <div className="text-3xl mb-2">🧠</div>
                                        <h3 className="font-bold mb-1" style={{ color: '#E67E22' }}>Cognitive Enhancement</h3>
                                        <p className="text-sm">Foods that support focus, memory, and reaction time</p>
                                    </div>

                                    <div className="p-4 rounded-lg" style={{ background: '#FFF8DC', border: '2px solid #F39C12' }}>
                                        <div className="text-3xl mb-2">💪</div>
                                        <h3 className="font-bold mb-1" style={{ color: '#E67E22' }}>Athletic Performance</h3>
                                        <p className="text-sm">Optimized for energy, recovery, and endurance</p>
                                    </div>

                                    <div className="p-4 rounded-lg" style={{ background: '#FFF8DC', border: '2px solid #F39C12' }}>
                                        <div className="text-3xl mb-2">🍛</div>
                                        <h3 className="font-bold mb-1" style={{ color: '#E67E22' }}>Cultural Authenticity</h3>
                                        <p className="text-sm">Traditional Indian flavors meet modern sports nutrition</p>
                                    </div>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="mt-8 pt-8 border-t-2 text-center" style={{ borderColor: '#FFE5CC' }}>
                                <p className="text-lg mb-4">
                                    Ready to optimize your nutrition for peak performance?
                                </p>
                                <a
                                    href="/survey"
                                    className="inline-block px-8 py-3 rounded-lg font-medium text-white transition-all hover:scale-105 shadow-md"
                                    style={{ background: 'linear-gradient(135deg, #FF9933 0%, #E67E22 100%)' }}
                                >
                                    Take the Nutrition Survey →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AboutPage;
