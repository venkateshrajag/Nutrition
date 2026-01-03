import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Handle the OAuth callback
        const handleCallback = async () => {
            try {
                // Get the session from the URL hash
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('Auth callback error:', error);
                    setError(error.message);
                    // Redirect to home page after 3 seconds
                    setTimeout(() => navigate('/'), 3000);
                    return;
                }

                if (data.session) {
                    // Check if user has completed survey
                    const { data: userData, error: userError } = await supabase
                        .from('users')
                        .select('has_completed_survey')
                        .eq('google_id', data.session.user.id)
                        .single();

                    if (userError) {
                        console.error('Error fetching user data:', userError);
                    }

                    // Redirect based on survey status
                    if (userData?.has_completed_survey) {
                        navigate('/dashboard');
                    } else {
                        navigate('/survey');
                    }
                } else {
                    // No session, redirect to home
                    navigate('/');
                }
            } catch (err) {
                console.error('Exception in auth callback:', err);
                setError('An unexpected error occurred');
                setTimeout(() => navigate('/'), 3000);
            }
        };

        handleCallback();
    }, [navigate]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)' }}>
                <div className="text-center p-8 rounded-lg shadow-xl" style={{ background: 'white', border: '2px solid #FF9933' }}>
                    <div className="text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold mb-4" style={{ color: '#E67E22' }}>
                        Authentication Error
                    </h1>
                    <p className="mb-4" style={{ color: '#8B4513' }}>
                        {error}
                    </p>
                    <p className="text-sm" style={{ color: '#8B4513' }}>
                        Redirecting to home page...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFE5CC 100%)' }}>
            <div className="text-center p-8 rounded-lg shadow-xl" style={{ background: 'white', border: '2px solid #FF9933' }}>
                <div className="animate-spin rounded-full h-16 w-16 mx-auto mb-4" style={{ border: '4px solid #FFE5CC', borderTopColor: '#FF9933' }}></div>
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#E67E22' }}>
                    Completing Sign In...
                </h1>
                <p style={{ color: '#8B4513' }}>
                    Please wait while we set up your account
                </p>
            </div>
        </div>
    );
};

export default AuthCallback;
