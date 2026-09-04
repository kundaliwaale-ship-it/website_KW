'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { login, signup } from '@/actions/auth'
import styles from './login.module.css'
import { Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'

export default function LoginPage() {
  const router = useRouter()
  const { dict } = useLanguage()
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
        <div style={{ marginBottom: '1rem' }}>
          <Link href="/" className="font-sans" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <ArrowLeft size={16} /> {dict.auth_page.back_home}
          </Link>
        </div>
        <h1 className="font-serif">
          {isLogin ? (
            <>{dict.auth_page.login.title_1} <em>{dict.auth_page.login.title_em}</em></>
          ) : (
            <>{dict.auth_page.signup.title_1} <em>{dict.auth_page.signup.title_em}</em></>
          )}
        </h1>
        <p className={`${styles.subtitle} font-sans`}>
          {isLogin
            ? dict.auth_page.login.subtitle
            : dict.auth_page.signup.subtitle}
        </p>


        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className="font-sans">{dict.auth_page.form.name_label}</label>
                <input type="text" name="fullName" required placeholder={dict.auth_page.form.name_ph} />
              </div>
              <div className={styles.formGroup}>
                <label className="font-sans">{dict.auth_page.form.phone_label}</label>
                <input type="tel" name="phone" required placeholder={dict.auth_page.form.phone_ph} />
              </div>
            </div>
          )}


          <div className={styles.formGroup}>
            <label className="font-sans">{dict.auth_page.form.email_label}</label>
            <input type="email" name="email" required placeholder={dict.auth_page.form.email_ph} />
          </div>

          <div className={styles.formGroup}>
            <label className="font-sans">{dict.auth_page.form.pass_label}</label>
            <input type="password" name="password" required placeholder={dict.auth_page.form.pass_ph} minLength={6} />
            {isLogin && (
              <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                <Link href="/forgot-password" className="font-sans" style={{ color: 'var(--color-gold)', fontSize: '0.85rem', textDecoration: 'none' }}>
                  {dict.auth_page.form.forgot_pass}
                </Link>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.submitBtn} font-sans`}
            disabled={loading}
          >
            {loading ? dict.auth_page.processing : isLogin ? dict.auth_page.login.btn : dict.auth_page.signup.btn}
          </button>
        </form>

        <div className={styles.toggleText}>
          <span className="font-sans">
            {isLogin ? dict.auth_page.login.toggle_text : dict.auth_page.signup.toggle_text}
          </span>
          <button type="button" className="font-sans" onClick={() => { setIsLogin(!isLogin); setError(null); }}>
            {isLogin ? dict.auth_page.login.toggle_btn : dict.auth_page.signup.toggle_btn}
          </button>
        </div>
      </div>
    </div>
  )
}
