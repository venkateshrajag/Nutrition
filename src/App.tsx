import React from 'react';
import Layout from './components/layout/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4" style={{
          background: 'linear-gradient(135deg, #FF9933 0%, #E67E22 50%, #C0392B 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Welcome to Saffron Suvai
        </h1>
        <p className="text-xl mb-8" style={{ color: '#8B4513' }}>
          Your personalized nutrition companion
        </p>
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-lg shadow-xl p-8"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8DC 100%)',
              border: '2px solid #F39C12',
              boxShadow: '0 10px 25px rgba(139, 69, 19, 0.15)'
            }}
          >
            <h2 className="text-3xl font-semibold mb-4" style={{ color: '#E67E22' }}>
              Get Started
            </h2>
            <p className="mb-6" style={{ color: '#8B4513' }}>
              Login with your Google account to access personalized nutrition recommendations,
              track your progress, and explore our cookbook of healthy recipes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div
                className="p-6 rounded-lg transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                  border: '2px solid #FF9933',
                  boxShadow: '0 4px 12px rgba(255, 153, 51, 0.2)'
                }}
              >
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-semibold mb-2" style={{ color: '#E67E22' }}>Track Progress</h3>
                <p className="text-sm" style={{ color: '#8B4513' }}>
                  Monitor your nutrition goals and see your improvements over time
                </p>
              </div>
              <div
                className="p-6 rounded-lg transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                  border: '2px solid #F39C12',
                  boxShadow: '0 4px 12px rgba(243, 156, 18, 0.2)'
                }}
              >
                <div className="text-4xl mb-3">🥗</div>
                <h3 className="font-semibold mb-2" style={{ color: '#E67E22' }}>Healthy Recipes</h3>
                <p className="text-sm" style={{ color: '#8B4513' }}>
                  Access a curated collection of nutritious and delicious recipes
                </p>
              </div>
              <div
                className="p-6 rounded-lg transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                  border: '2px solid #C0392B',
                  boxShadow: '0 4px 12px rgba(192, 57, 43, 0.2)'
                }}
              >
                <div className="text-4xl mb-3">💡</div>
                <h3 className="font-semibold mb-2" style={{ color: '#E67E22' }}>Personalized Tips</h3>
                <p className="text-sm" style={{ color: '#8B4513' }}>
                  Receive customized nutrition advice based on your profile and goals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
