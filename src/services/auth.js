import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Authentication Service
 * Handles sign in, sign up, sign out
 */

/**
 * Sign up with email and password
 */
export const signUp = async (email, password) => {
  if (!isSupabaseConfigured()) {
    // Fallback: Mock auth for development
    console.warn('Supabase not configured. Using mock auth.');
    return { user: { id: 'mock-user', email }, session: null };
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

/**
 * Sign in with email and password
 */
export const signIn = async (email, password) => {
  if (!isSupabaseConfigured()) {
    // Fallback: Mock auth for development
    console.warn('Supabase not configured. Using mock auth.');
    return { user: { id: 'mock-user', email }, session: null };
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

/**
 * Sign out
 */
export const signOut = async () => {
  if (!isSupabaseConfigured()) {
    return;
  }
  
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

/**
 * Get current session
 */
export const getSession = async () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback) => {
  if (!isSupabaseConfigured()) {
    return { data: { subscription: null }, error: null };
  }
  
  return supabase.auth.onAuthStateChange(callback);
};

