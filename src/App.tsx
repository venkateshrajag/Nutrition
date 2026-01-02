import React from 'react';
import Layout from './components/layout/Layout';

const App: React.FC = () => {
  return (
    <Layout>
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Saffron Suvai
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your personalized nutrition companion
        </p>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get Started
            </h2>
            <p className="text-gray-600 mb-6">
              Login with your Google account to access personalized nutrition recommendations,
              track your progress, and explore our cookbook of healthy recipes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold text-gray-800 mb-2">Track Progress</h3>
                <p className="text-sm text-gray-600">
                  Monitor your nutrition goals and see your improvements over time
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-3">🥗</div>
                <h3 className="font-semibold text-gray-800 mb-2">Healthy Recipes</h3>
                <p className="text-sm text-gray-600">
                  Access a curated collection of nutritious and delicious recipes
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="font-semibold text-gray-800 mb-2">Personalized Tips</h3>
                <p className="text-sm text-gray-600">
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
