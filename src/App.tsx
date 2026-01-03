import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AuthCallback from './pages/AuthCallback';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SurveyForm from './components/survey/SurveyForm';
import FeedbackDisplay from './components/feedback/FeedbackDisplay';
import { generateFeedback, NutritionFeedback } from './utils/nutritionCalculations';
import { supabase } from './lib/supabase';
import { useAuth } from './hooks/useAuth';
import RecipeList from './components/cookbook/RecipeList';
import AboutPage from './pages/AboutPage';
import MealCalendarPage from './pages/MealCalendarPage';

// Home/Landing Page Component
const HomePage: React.FC = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleFeatureClick = (route: string) => {
    if (!user) {
      // User not logged in - prompt to login
      signInWithGoogle();
    } else {
      // User already logged in - navigate directly
      navigate(route);
    }
  };

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
          Where culture meets performance
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
              track your progress, and explore our cookbook of healthy Indian recipes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div
                onClick={() => handleFeatureClick('/survey')}
                className="p-6 rounded-lg transition-transform hover:scale-105 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                  border: '2px solid #FF9933',
                  boxShadow: '0 4px 12px rgba(255, 153, 51, 0.2)'
                }}
              >
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-semibold mb-2" style={{ color: '#E67E22' }}>Nutrition Survey</h3>
                <p className="text-sm" style={{ color: '#8B4513' }}>
                  Complete a personalized survey to get tailored nutrition recommendations
                </p>
              </div>
              <div
                onClick={() => handleFeatureClick('/cookbook')}
                className="p-6 rounded-lg transition-transform hover:scale-105 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                  border: '2px solid #F39C12',
                  boxShadow: '0 4px 12px rgba(243, 156, 18, 0.2)'
                }}
              >
                <div className="text-4xl mb-3">🥗</div>
                <h3 className="font-semibold mb-2" style={{ color: '#E67E22' }}>Indian Recipes</h3>
                <p className="text-sm" style={{ color: '#8B4513' }}>
                  Browse 14 healthy Indian recipes with complete nutrition information
                </p>
              </div>
              <div
                onClick={() => handleFeatureClick('/calendar')}
                className="p-6 rounded-lg transition-transform hover:scale-105 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                  border: '2px solid #E67E22',
                  boxShadow: '0 4px 12px rgba(230, 126, 34, 0.2)'
                }}
              >
                <div className="text-4xl mb-3">📅</div>
                <h3 className="font-semibold mb-2" style={{ color: '#E67E22' }}>Meal Calendar</h3>
                <p className="text-sm" style={{ color: '#8B4513' }}>
                  Plan your weekly meals with our interactive calendar and recipe selector
                </p>
              </div>
              <div
                onClick={() => handleFeatureClick('/dashboard')}
                className="p-6 rounded-lg transition-transform hover:scale-105 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                  border: '2px solid #C0392B',
                  boxShadow: '0 4px 12px rgba(192, 57, 43, 0.2)'
                }}
              >
                <div className="text-4xl mb-3">💡</div>
                <h3 className="font-semibold mb-2" style={{ color: '#E67E22' }}>Personalized Feedback</h3>
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

// Survey Page
const SurveyPage: React.FC = () => {
  return <SurveyForm />;
};

// Dashboard Page
const DashboardPage: React.FC = () => {
  const { userProfile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<NutritionFeedback | null>(null);
  const [surveyDate, setSurveyDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveyAndGenerateFeedback = async () => {
      // Wait for auth to finish loading before checking userProfile
      if (authLoading) {
        return;
      }

      if (!userProfile) {
        setError('Please complete your one-time profile to get started');
        setLoading(false);
        return;
      }

      try {
        // Fetch the latest survey for this user
        const { data: surveyData, error: surveyError } = await supabase
          .from('surveys')
          .select('*')
          .eq('user_id', userProfile.id)
          .order('completed_at', { ascending: false })
          .limit(1)
          .single();

        if (surveyError || !surveyData) {
          console.error('Error fetching survey:', surveyError);
          setError('No survey found. Please complete the survey first.');
          setLoading(false);
          return;
        }

        // Generate feedback from survey responses
        const generatedFeedback = generateFeedback(surveyData.responses);
        setFeedback(generatedFeedback);
        setSurveyDate(surveyData.completed_at);

        // Save feedback to database
        const { error: feedbackError } = await supabase
          .from('feedback')
          .insert({
            user_id: userProfile.id,
            survey_id: surveyData.id,
            content: {
              summary: generatedFeedback.summary,
              recommendations: generatedFeedback.recommendations,
              calculations: generatedFeedback.calculations
            }
          });

        if (feedbackError) {
          console.error('Error saving feedback:', feedbackError);
          // Don't show error to user since we still have the feedback to display
        }

        setLoading(false);
      } catch (err) {
        console.error('Exception fetching survey:', err);
        setError('Failed to load your nutrition plan');
        setLoading(false);
      }
    };

    fetchSurveyAndGenerateFeedback();
  }, [userProfile, authLoading]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)' }}>
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-16 w-16 mx-auto mb-4" style={{ border: '4px solid #FFE5CC', borderTopColor: '#FF9933' }}></div>
            <p className="text-xl" style={{ color: '#E67E22' }}>Generating your nutrition plan...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !feedback) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)' }}>
          <div className="text-center p-8 max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#E67E22' }}>
              {error || 'No feedback available'}
            </h2>
            <a
              href="/survey"
              className="inline-block px-6 py-3 rounded-lg font-medium text-white transition-all hover:scale-105 shadow-md"
              style={{ background: 'linear-gradient(135deg, #FF9933 0%, #E67E22 100%)' }}
            >
              Complete Survey
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-12" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <FeedbackDisplay feedback={feedback} surveyDate={surveyDate} />

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/cookbook"
              className="p-6 rounded-lg shadow-lg transition-transform hover:scale-105 text-center"
              style={{
                background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                border: '2px solid #FF9933'
              }}
            >
              <span className="text-4xl mb-2 block">🥗</span>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#E67E22' }}>
                Browse Recipes
              </h3>
              <p className="text-sm" style={{ color: '#8B4513' }}>
                Explore 14 healthy Indian recipes matching your nutrition goals
              </p>
            </a>

            <a
              href="/survey"
              className="p-6 rounded-lg shadow-lg transition-transform hover:scale-105 text-center"
              style={{
                background: 'linear-gradient(135deg, #FFE5CC 0%, #FFF8DC 100%)',
                border: '2px solid #F39C12'
              }}
            >
              <span className="text-4xl mb-2 block">🔄</span>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#E67E22' }}>
                Retake Survey
              </h3>
              <p className="text-sm" style={{ color: '#8B4513' }}>
                Update your profile to get fresh recommendations
              </p>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Cookbook Page
const CookbookPage: React.FC = () => {
  return <RecipeList />;
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/survey"
        element={
          <ProtectedRoute>
            <SurveyPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cookbook"
        element={
          <ProtectedRoute>
            <CookbookPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <MealCalendarPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;

