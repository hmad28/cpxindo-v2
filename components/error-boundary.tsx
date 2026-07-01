'use client';
import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div style={{ padding: '80px 20px', textAlign: 'center', minHeight: '40vh' }}>
          <h2 style={{ font: '700 28px var(--font-oswald)', marginBottom: '10px' }}>TERJADI KESALAHAN</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>Maaf, halaman mengalami error. Silakan muat ulang halaman.</p>
          <a href="/" className="btn primary" style={{ display: 'inline-block', padding: '12px 30px', background: '#e3262e', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: '700' }}>
            KEMBALI KE BERANDA
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
