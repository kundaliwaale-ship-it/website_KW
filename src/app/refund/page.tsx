'use client'

import React from 'react'
import styles from '../terms/legal.module.css'
import { useLanguage } from '@/i18n/LanguageContext'

export default function RefundPage() {
  const { dict } = useLanguage()
  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>
      
      <div className={`${styles.container} relative-z glass-card`}>
        <h1 className="font-serif">{dict.refund_page.title}</h1>
        <p className="font-sans" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{dict.refund_page.updated}</p>
        
        <div className={`${styles.content} font-sans`}>
          <h2>{dict.refund_page.s1_title}</h2>
          <p>{dict.refund_page.s1_text}</p>

          <h2>{dict.refund_page.s2_title}</h2>
          <p>{dict.refund_page.s2_text}</p>

          <h2>{dict.refund_page.s3_title}</h2>
          <p>{dict.refund_page.s3_text}</p>

          <h2>{dict.refund_page.s4_title}</h2>
          <p>{dict.refund_page.s4_text}</p>
        </div>
      </div>
    </div>
  )
}
