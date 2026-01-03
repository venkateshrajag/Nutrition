import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface UserProfile {
  id: string;
  google_id: string;
  email: string;
  name: string | null;
  picture: string | null;
  has_completed_survey: boolean;
  created_at: string;
  last_login_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create or update user profile in database
  const upsertUserProfile = async (authUser: User) => {
    try {
      console.log('Attempting to upsert user profile for:', authUser.email);
      console.log('User metadata:', authUser.user_metadata);

      const userData = {
        google_id: authUser.id,
        email: authUser.email!,
        name: authUser.user_metadata?.name || authUser.user_metadata?.full_name || null,
        picture: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || null,
        last_login_at: new Date().toISOString()
      };

      console.log('Upserting data:', userData);

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Upsert timeout')), 5000)
      );

      const upsertPromise = supabase
        .from('users')
        .upsert(userData, {
          onConflict: 'google_id',
          ignoreDuplicates: false
        })
        .select()
        .single();

      const { data, error } = await Promise.race([upsertPromise, timeoutPromise]) as any;

      if (error) {
        console.error('Error upserting user profile:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        console.error('Error hint:', error.hint);
        return null;
      }

      console.log('User profile created/updated successfully:', data);
      return data as UserProfile;
    } catch (err) {
      console.error('Exception upserting user profile:', err);
      return null;
    }
  };

  useEffect(() => {
    console.log('useAuth: useEffect running');

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.error('Supabase is not configured');
      setError('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
      setLoading(false);
      return;
    }

    console.log('useAuth: Supabase is configured, fetching session...');

    // Get initial session
    supabase.auth.getSession()
      .then(async ({ data: { session }, error: sessionError }) => {
        console.log('useAuth: getSession completed', { session: !!session, error: sessionError });

        if (sessionError) {
          console.error('Session error:', sessionError);
          setLoading(false);
          return;
        }

        if (session?.user) {
          console.log('useAuth: User found, setting user state');
          setUser(session.user);

          // Create/update user profile and fetch it
          const profile = await upsertUserProfile(session.user);
          if (profile) {
            console.log('useAuth: Profile set successfully');
            setUserProfile(profile);
          } else {
            console.warn('useAuth: Could not create/fetch user profile. User can still access the app.');
          }
        } else {
          console.log('useAuth: No session found');
        }

        console.log('useAuth: Setting loading to false');
        setLoading(false);
      })
      .catch((err) => {
        console.error('useAuth: Error in getSession:', err);
        setLoading(false);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('useAuth: Auth state changed', { event: _event, session: !!session });
      setUser(session?.user ?? null);

      if (session?.user) {
        const profile = await upsertUserProfile(session.user);
        if (profile) {
          setUserProfile(profile);
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      console.log('useAuth: Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured()) {
      console.error('Supabase is not configured');
      setError('Authentication is not configured');
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        },
      });

      if (error) {
        console.error('Error logging in:', error.message);
        setError(error.message);
      }
    } catch (err) {
      console.error('Exception during login:', err);
      setError('Failed to initiate login');
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      console.error('Supabase is not configured');
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
        setError(error.message);
      } else {
        setUser(null);
        setUserProfile(null);
      }
    } catch (err) {
      console.error('Exception during logout:', err);
      setError('Failed to logout');
    }
  };

  console.log('useAuth: Current state', { user: !!user, userProfile: !!userProfile, loading });

  return {
    user,
    userProfile,
    loading,
    error,
    signInWithGoogle,
    signOut,
  };
}
