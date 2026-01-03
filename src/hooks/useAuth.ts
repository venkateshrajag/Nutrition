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
      const { data, error } = await supabase
        .from('users')
        .upsert({
          google_id: authUser.id,
          email: authUser.email!,
          name: authUser.user_metadata?.name || authUser.user_metadata?.full_name,
          picture: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture,
          last_login_at: new Date().toISOString()
        }, {
          onConflict: 'google_id',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error upserting user profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (err) {
      console.error('Exception upserting user profile:', err);
      return null;
    }
  };

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        // Create/update user profile and fetch it
        const profile = await upsertUserProfile(session.user);
        if (profile) {
          setUserProfile(profile);
        }
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        // Create/update user profile and fetch it
        const profile = await upsertUserProfile(session.user);
        if (profile) {
          setUserProfile(profile);
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
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

  return {
    user,
    userProfile,
    loading,
    error,
    signInWithGoogle,
    signOut,
  };
}

