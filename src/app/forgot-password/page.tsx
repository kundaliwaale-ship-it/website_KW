'use client'

import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import styles from '../login/login.module.css'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
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
          Recover <em>Account</em>
        </h1>
        <p className={`${styles.subtitle} font-sans`}>
          Enter your email address and we will send you a password reset link.
        </p>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div style={{ color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>Check your email for the reset link!</div>}

        {!success && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className="font-sans">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                placeholder="you@example.com" 
              />
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} font-sans`}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className={styles.toggleText}>
          <Link href="/login" className="font-sans" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
