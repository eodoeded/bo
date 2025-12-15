import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/auth';
import { isSupabaseConfigured } from '../lib/supabase';

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isSupabaseConfigured()) {
        // If Supabase not configured, allow access (fallback mode)
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      try {
        const user = await getCurrentUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-[#261E19] text-white font-montreal flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#E3E3FD]/20 border-t-[#E3E3FD] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">VERIFYING_ACCESS...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

