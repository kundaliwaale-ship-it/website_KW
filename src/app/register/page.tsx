'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import styles from '../login/login.module.css'; // Reuse login styles
import Button from '@/components/ui/Button';
import { createClient } from '@/utils/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      // Wait 2 seconds then redirect to login
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
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

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.authCard} style={{ textAlign: 'center', padding: '2rem 0' }}>
          <span style={{ marginBottom: '1rem', color: '#22c55e', display: 'flex', justifyContent: 'center' }}><CheckCircle size={48} /></span>
          <h2 className="font-serif" style={{ marginBottom: '1rem' }}>Registration Successful!</h2>
          <p className="font-sans">You can now log in to your account. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.authCard}>
        <h1 className="font-serif">Create Account</h1>
        <p className="font-sans">Join us to access personalized reports and consultations.</p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.field}>
            <label className="font-sans" htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              required
              className="font-sans"
            />
          </div>

          <div className={styles.field}>
            <label className="font-sans" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              required
              className="font-sans"
            />
          </div>

          <div className={styles.field}>
            <label className="font-sans" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              required
              className="font-sans"
              minLength={6}
            />
          </div>

          <div className={styles.field}>
            <label className="font-sans" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              required
              className="font-sans"
              minLength={6}
            />
          </div>

          <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '0.5rem' }} disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }}></div>
          <span className="font-sans" style={{ padding: '0 1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }}></div>
        </div>

        <button 
          onClick={handleGoogleLogin} 
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'var(--bg-surface)',
            color: 'var(--text-inverse)',
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
          <span className="font-sans">Already have an account?</span>
          <Link href="/login" className="font-sans">Log In</Link>
        </div>
      </div>
    </div>
  );
}
