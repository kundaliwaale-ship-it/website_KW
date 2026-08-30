'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import styles from '../login/login.module.css'

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClient()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
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
          New <em>Password</em>
        </h1>
        <p className={`${styles.subtitle} font-sans`}>
          Enter your new password below.
        </p>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div style={{ color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>Password updated successfully! Redirecting...</div>}

        {!success && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className="font-sans">New Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                placeholder="••••••••" 
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} font-sans`}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
