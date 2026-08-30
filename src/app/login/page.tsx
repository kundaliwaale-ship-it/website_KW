'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { login, signup } from '@/actions/auth'
import styles from './login.module.css'
import { Sparkles, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const result = isLogin ? await login(formData) : await signup(formData)
      if (result?.error) {
        setError(result.error)
      } else if (result?.redirectTo) {
        router.push(result.redirectTo)
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.authContainer}>
        <h1 className="font-serif">
          {isLogin ? (
            <>Welcome <em>Back</em></>
          ) : (
            <>Join <em>Kundaliwaale</em></>
          )}
        </h1>
        <p className={`${styles.subtitle} font-sans`}>
          {isLogin
            ? 'Sign in to access your dashboard and orders'
            : 'Create an account to get started with your cosmic journey'}
        </p>


        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className="font-sans">Full Name</label>
                <input type="text" name="fullName" required placeholder="John Doe" />
              </div>
              <div className={styles.formGroup}>
                <label className="font-sans">Phone Number</label>
                <input type="tel" name="phone" required placeholder="+91 98765 00000" />
              </div>
            </div>
          )}


          <div className={styles.formGroup}>
            <label className="font-sans">Email Address</label>
            <input type="email" name="email" required placeholder="you@example.com" />
          </div>

          <div className={styles.formGroup}>
            <label className="font-sans">Password</label>
            <input type="password" name="password" required placeholder="••••••••" minLength={6} />
            {isLogin && (
              <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                <Link href="/forgot-password" className="font-sans" style={{ color: 'var(--color-gold)', fontSize: '0.85rem', textDecoration: 'none' }}>
                  Forgot Password?
                </Link>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.submitBtn} font-sans`}
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className={styles.toggleText}>
          <span className="font-sans">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button type="button" className="font-sans" onClick={() => { setIsLogin(!isLogin); setError(null); }}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}
