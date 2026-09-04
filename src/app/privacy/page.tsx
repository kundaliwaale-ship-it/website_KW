'use client'

import React from 'react'
import styles from '../terms/legal.module.css'
import { useLanguage } from '@/i18n/LanguageContext'

export default function PrivacyPage() {
  const { dict } = useLanguage()
  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>
      
      <div className={`${styles.container} relative-z glass-card`}>
        <h1 className="font-serif">{dict.privacy_page.title}</h1>
        <p className="font-sans" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{dict.privacy_page.updated}</p>
        
        <div className={`${styles.content} font-sans`}>
          <h2>{dict.privacy_page.s1_title}</h2>
          <p>{dict.privacy_page.s1_text}</p>

          <h2>{dict.privacy_page.s2_title}</h2>
          <p>{dict.privacy_page.s2_text}</p>

          <h2>{dict.privacy_page.s3_title}</h2>
          <p>{dict.privacy_page.s3_text}</p>

          <h2>{dict.privacy_page.s4_title}</h2>
          <p>{dict.privacy_page.s4_text}</p>

          <h2>{dict.privacy_page.s5_title}</h2>
          <p>{dict.privacy_page.s5_text}</p>

          <h2>{dict.privacy_page.s6_title}</h2>
          <p>{dict.privacy_page.s6_text}</p>
        </div>
      </div>
    </div>
  )
}
