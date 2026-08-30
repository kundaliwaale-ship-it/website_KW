'use client'

import React from 'react'
import styles from '../terms/legal.module.css'

export default function PrivacyPage() {
  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>
      
      <div className={`${styles.container} relative-z glass-card`}>
        <h1 className="font-serif">Privacy Policy</h1>
        <p className="font-sans" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Last updated: August 2026</p>
        
        <div className={`${styles.content} font-sans`}>
          <h2>1. Information We Collect</h2>
          <p>We collect personal information that you provide to us, including your name, email address, phone number, and specific birth details (Date, Time, Place of Birth) required for astrological calculations.</p>

          <h2>2. How We Use Your Information</h2>
          <p>The information we collect is used solely to provide and improve our services to you, process transactions, and communicate with you about your orders.</p>

          <h2>3. Data Security</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information. Your astrological data is strictly confidential and is never shared with third-party marketers.</p>

          <h2>4. Payment Information</h2>
          <p>All payments are processed securely through Razorpay. We do not store your credit card details or bank information on our servers.</p>

          <h2>5. Cookies</h2>
          <p>We use cookies to enhance your experience, gather general visitor information, and track visits to our website.</p>

          <h2>6. Contact Us</h2>
          <p>If you have any questions regarding this privacy policy, you may contact us using the information on our Contact page.</p>
        </div>
      </div>
    </div>
  )
}
