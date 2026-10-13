import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#090D16] text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900/90 border border-white/10 rounded-2xl p-6 md:p-8 text-center shadow-2xl backdrop-blur-md">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white mb-2">
              出現問題，請重新整理頁面
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mb-6">
              Something went wrong. Please refresh the page to continue.
            </p>
            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/40 transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新整理頁面</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
