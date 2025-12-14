import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="min-h-screen bg-[#261E19] flex items-center justify-center p-6">
            <div className="w-full max-w-sm bg-[#1A1614] border border-white/10 p-8 rounded-xl text-center">
                <div className="w-12 h-12 bg-[#E3E3FD]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-2 h-2 bg-[#E3E3FD] rounded-full"></div>
                </div>
                <h1 className="font-montreal text-2xl text-white mb-2">Studio Access</h1>
                <p className="font-montreal text-white/40 text-sm mb-8">Restricted to authorized personnel.</p>
                
                <Link 
                    to="/studio"
                    className="block w-full bg-[#E3E3FD] text-black py-3 font-mono text-[11px] uppercase tracking-widest rounded-md hover:bg-white transition-colors"
                >
                    Enter System
                </Link>
            </div>
        </div>
    )
}

