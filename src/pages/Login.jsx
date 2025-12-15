import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { signIn } from '../services/auth';
import { isSupabaseConfigured } from '../lib/supabase';
import UnifiedNav from '../components/UnifiedNav';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isSupabaseConfigured()) {
      // Fallback mode - allow access without auth
      navigate('/studio');
      return;
    }

    setIsLoading(true);
    try {
      const { user, error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError.message || 'Invalid email or password');
        return;
      }

      // Success - redirect to studio
      navigate('/studio');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#261E19] text-white font-montreal flex flex-col relative">
      <UnifiedNav />
      <div className="fixed inset-0 bg-[#261E19] z-0"></div>
      <div className="flex-1 flex items-center justify-center p-6 pt-20 md:pt-24 relative z-10">
      
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ 
        backgroundImage: 'radial-gradient(#E3E3FD 1px, transparent 1px)', 
        backgroundSize: '30px 30px' 
      }}></div>

      <div className="w-full max-w-md bg-[#1A1614] border border-white/10 p-8 md:p-12 rounded-3xl relative z-10 shadow-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 bg-[#E3E3FD] rounded-full animate-pulse shadow-[0_0_8px_#E3E3FD]"></div>
            <span className="font-mono text-[9px] text-[#E3E3FD] uppercase tracking-widest">STUDIO_ACCESS</span>
          </div>
          <h1 className="font-montreal font-medium text-3xl md:text-4xl tracking-tight mb-3 text-white">
            Sign In
          </h1>
          <p className="font-montreal text-white/50 text-sm">
            Access your studio dashboard and tools.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start gap-3">
            <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <p className="font-mono text-[10px] text-red-400 flex-1">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-mono text-[10px] text-white/60 uppercase tracking-widest mb-2">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#261E19] border border-white/10 px-4 py-3 rounded-lg font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E3E3FD]/50 transition-colors"
              placeholder="studio@agency.com"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] text-white/60 uppercase tracking-widest mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#261E19] border border-white/10 px-4 py-3 rounded-lg font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E3E3FD]/50 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E3E3FD] text-[#261E19] px-6 py-3 font-mono font-semibold text-[11px] uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#261E19]/20 border-t-[#261E19] rounded-full animate-spin"></div>
                AUTHENTICATING...
              </>
            ) : (
              <>
                SIGN_IN
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="font-mono text-[10px] text-white/40 text-center mb-3">
            NEED_AN_ACCOUNT?
          </p>
          <Link
            to="/signup"
            className="block w-full text-center bg-white/5 border border-white/10 px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors rounded-lg"
          >
            CREATE_STUDIO_ACCOUNT
          </Link>
        </div>

        {/* Fallback Mode Notice */}
        {!isSupabaseConfigured() && (
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <p className="font-mono text-[9px] text-yellow-400 text-center">
              ⚠️ SUPABASE_NOT_CONFIGURED // USING_LOCALSTORAGE_MODE
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}


