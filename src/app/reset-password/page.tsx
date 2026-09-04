'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import styles from '../login/login.module.css'
import { useLanguage } from '@/i18n/LanguageContext'

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClient()
  const { dict } = useLanguage()
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
          {dict.reset_password_page.title_1} <em>{dict.reset_password_page.title_em}</em>
        </h1>
        <p className={`${styles.subtitle} font-sans`}>
          {dict.reset_password_page.subtitle}
        </p>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div style={{ color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>{dict.reset_password_page.success}</div>}

        {!success && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className="font-sans">{dict.reset_password_page.new_pass_label}</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                placeholder={dict.auth_page.form.pass_ph}
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} font-sans`}
              disabled={loading}
            >
              {loading ? dict.reset_password_page.btn_updating : dict.reset_password_page.btn_update}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
