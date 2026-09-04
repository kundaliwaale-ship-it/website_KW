'use client'

import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import styles from '../login/login.module.css'
import Link from 'next/link'
import { useLanguage } from '@/i18n/LanguageContext'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const { dict } = useLanguage()
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
          {dict.forgot_password_page.title_1} <em>{dict.forgot_password_page.title_em}</em>
        </h1>
        <p className={`${styles.subtitle} font-sans`}>
          {dict.forgot_password_page.subtitle}
        </p>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div style={{ color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>{dict.forgot_password_page.success}</div>}

        {!success && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className="font-sans">{dict.auth_page.form.email_label}</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                placeholder={dict.auth_page.form.email_ph}
              />
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} font-sans`}
              disabled={loading}
            >
              {loading ? dict.forgot_password_page.btn_sending : dict.forgot_password_page.btn_send}
            </button>
          </form>
        )}

        <div className={styles.toggleText}>
          <Link href="/login" className="font-sans" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>
            {dict.forgot_password_page.back_login}
          </Link>
        </div>
      </div>
    </div>
  )
}
