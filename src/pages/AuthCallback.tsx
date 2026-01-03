import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        // Handle the OAuth callback
        const handleCallback = async () => {
            try {
                console.log('AuthCallback: Starting callback handling');

                // Set a timeout to catch hanging promises
                timeoutId = setTimeout(() => {
                    console.error('AuthCallback: Timeout - getSession took too long');
                    setError('Authentication timeout. Please try again.');
                    navigate('/');
                }, 10000);

                // Get the session from the URL hash
                const { data, error: sessionError } = await supabase.auth.getSession();

                clearTimeout(timeoutId);

                console.log('AuthCallback: Session data received', {
                    hasSession: !!data?.session,
                    error: sessionError,
                    userId: data?.session?.user?.id
                });

                if (sessionError) {
                    console.error('Auth callback error:', sessionError);
                    setError(sessionError.message);
                    setTimeout(() => navigate('/'), 3000);
                    return;
                }

                if (data.session) {
                    console.log('AuthCallback: Session found, creating/updating user profile');

                    // Try to create/update user profile first
                    const { data: upsertData, error: upsertError } = await supabase
                        .from('users')
                        .upsert({
                            google_id: data.session.user.id,
                            email: data.session.user.email!,
                            name: data.session.user.user_metadata?.name || data.session.user.user_metadata?.full_name || null,
                            picture: data.session.user.user_metadata?.avatar_url || data.session.user.user_metadata?.picture || null,
                            last_login_at: new Date().toISOString()
                        }, {
                            onConflict: 'google_id',
                            ignoreDuplicates: false
                        })
                        .select()
                        .single();

                    if (upsertError) {
                        console.error('AuthCallback: Error creating user profile:', upsertError);
                        console.error('AuthCallback: Error details:', {
                            code: upsertError.code,
                            message: upsertError.message,
                            details: upsertError.details,
                            hint: upsertError.hint
                        });
                        // Continue anyway - redirect to survey as default
                        console.log('AuthCallback: Redirecting to /survey (default for profile creation failure)');
                        navigate('/survey');
                        return;
                    }

                    console.log('AuthCallback: User profile created/updated:', upsertData);

                    // Redirect based on survey status
                    if (upsertData?.has_completed_survey) {
                        console.log('AuthCallback: User has completed survey, redirecting to /dashboard');
                        navigate('/dashboard');
                    } else {
                        console.log('AuthCallback: User has not completed survey, redirecting to /survey');
                        navigate('/survey');
                    }
                } else {
                    // No session, redirect to home
                    console.log('AuthCallback: No session found, redirecting to /');
                    navigate('/');
                }
            } catch (err) {
                clearTimeout(timeoutId);
                console.error('Exception in auth callback:', err);
                setError('An unexpected error occurred');
                setTimeout(() => navigate('/'), 3000);
            }
        };

        handleCallback();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
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
