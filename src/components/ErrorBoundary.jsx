import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#261E19] text-white font-montreal flex items-center justify-center p-8">
                    <div className="max-w-2xl w-full bg-[#1A1614] border border-red-500/30 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                            <h2 className="font-mono text-[10px] text-red-400 uppercase tracking-widest">ERROR</h2>
                        </div>
                        <h1 className="font-montreal text-2xl mb-4 text-white">Something went wrong</h1>
                        <p className="font-montreal text-white/60 mb-6">
                            An error occurred while rendering this component. Please try refreshing the page.
                        </p>
                        {this.state.error && (
                            <details className="mb-6">
                                <summary className="font-mono text-[9px] text-white/40 uppercase tracking-widest cursor-pointer mb-2">
                                    Error Details
                                </summary>
                                <pre className="bg-black/50 border border-white/10 rounded-lg p-4 text-xs text-white/60 font-mono overflow-auto max-h-64">
                                    {this.state.error.toString()}
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}
                        <button
                            onClick={() => {
                                this.setState({ hasError: false, error: null });
                                window.location.reload();
                            }}
                            className="bg-[#E3E3FD] text-[#261E19] px-6 py-3 font-mono font-semibold text-[11px] uppercase tracking-widest hover:bg-white transition-colors rounded-lg"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

