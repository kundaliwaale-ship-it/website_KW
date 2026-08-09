'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import Button from '@/components/ui/Button';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.authCard}>
        <h1 className="font-serif">Welcome Back</h1>
        <p className="font-sans">Log in to view your orders and consultations.</p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.field}>
            <label className="font-sans" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="font-sans"
            />
          </div>

          <div className={styles.field}>
            <label className="font-sans" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="font-sans"
            />
          </div>

          <Link href="/login" className={`${styles.forgotPassword} font-sans`}>
            Forgot Password?
          </Link>

          <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '0.5rem' }} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }}></div>
          <span className="font-sans" style={{ padding: '0 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }}></div>
        </div>

        <button 
          onClick={handleGoogleLogin} 
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'var(--bg-panel)',
            color: 'var(--text-dark)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'background var(--transition-fast)'
          }}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
          Continue with Google
        </button>

        <div className={styles.footer}>
          <span className="font-sans">Don&apos;t have an account?</span>
          <Link href="/register" className="font-sans">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
