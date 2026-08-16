'use client'

import React, { useState } from 'react'
import { login, signup } from '@/actions/auth'
import styles from './login.module.css'
import Button from '@/components/ui/Button'

export default function LoginPage() {
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
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.authContainer}>
        <h1 className="font-serif thread-heading">
          {isLogin ? (
            <>Welcome <em>Back</em></>
          ) : (
            <>Create <em>Account</em></>
          )}
        </h1>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className={styles.formGroup}>
                <label className="font-sans">Full Name</label>
                <input type="text" name="fullName" required placeholder="John Doe" />
              </div>
              <div className={styles.formGroup}>
                <label className="font-sans">Phone Number</label>
                <input type="tel" name="phone" required placeholder="+91 98765 00000" />
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label className="font-sans">Email Address</label>
            <input type="email" name="email" required placeholder="john@example.com" />
          </div>

          <div className={styles.formGroup}>
            <label className="font-sans">Password</label>
            <input type="password" name="password" required placeholder="••••••••" />
          </div>

          <Button 
            variant="primary" 
            style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </Button>
        </form>

        <div className={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}
