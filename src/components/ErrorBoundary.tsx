import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('advyx_lang_manual');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
          <div className="max-w-md w-full text-center space-y-4 p-8 bg-slate-800/80 rounded-2xl border border-slate-700 shadow-2xl">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#2374B8]/20 flex items-center justify-center text-[#2374B8] text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold font-display">Something went wrong</h2>
            <p className="text-sm text-slate-400">
              The page encountered a temporary display issue. Click below to reload the site.
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-2.5 rounded-full text-sm font-bold bg-[#2374B8] hover:bg-[#18598F] text-white transition-all shadow-lg shadow-[#2374B8]/30 cursor-pointer"
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
