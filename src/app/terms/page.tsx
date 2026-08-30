'use client'

import React from 'react'
import styles from './legal.module.css'

export default function TermsPage() {
  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>
      
      <div className={`${styles.container} relative-z glass-card`}>
        <h1 className="font-serif">Terms & Conditions</h1>
        <p className="font-sans" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Last updated: August 2026</p>
        
        <div className={`${styles.content} font-sans`}>
          <h2>1. Introduction</h2>
          <p>Welcome to Kundaliwaale. By accessing our website and using our services (Vedic Astrology, Vastu, Kundli creation), you agree to comply with and be bound by the following terms and conditions of use.</p>

          <h2>2. Services Offered</h2>
          <p>Kundaliwaale provides astrological consultations, handcrafted Kundli reports, and Vastu analysis. All readings and reports are based on the principles of Vedic Astrology.</p>

          <h2>3. Intellectual Property</h2>
          <p>All content on this website, including but not limited to text, graphics, logos, and digital downloads, is the property of Kundaliwaale and protected by international copyright laws.</p>

          <h2>4. User Responsibilities</h2>
          <p>You agree to provide accurate information (Date, Time, and Place of birth) when booking our services. Kundaliwaale is not responsible for inaccurate reports generated due to incorrect information provided by the user.</p>

          <h2>5. Limitation of Liability</h2>
          <p>Astrology is an ancient science and art. The advice and reports provided by Kundaliwaale are for guidance purposes only. We are not liable for any personal, financial, or emotional decisions made based on our consultations.</p>

          <h2>6. Modifications</h2>
          <p>We reserve the right to modify these terms at any time. Changes will be posted on this page.</p>
        </div>
      </div>
    </div>
  )
}
