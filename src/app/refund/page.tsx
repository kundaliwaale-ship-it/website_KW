'use client'

import React from 'react'
import styles from '../terms/legal.module.css'

export default function RefundPage() {
  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>
      
      <div className={`${styles.container} relative-z glass-card`}>
        <h1 className="font-serif">Refund & Cancellation Policy</h1>
        <p className="font-sans" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Last updated: August 2026</p>
        
        <div className={`${styles.content} font-sans`}>
          <h2>1. Consultations</h2>
          <p>Cancellations for astrology or Vastu consultations must be made at least 24 hours in advance to receive a full refund. Cancellations made within 24 hours of the appointment will not be refunded.</p>

          <h2>2. Handwritten Kundli Reports</h2>
          <p>Because our Kundli reports are entirely handcrafted and personalized based on the specific details you provide, we cannot offer refunds once work on the report has commenced (typically within 1 hour of placing the order).</p>

          <h2>3. Incorrect Details Provided</h2>
          <p>If you realize you have provided incorrect birth details, please contact us immediately. If the report has not yet been started, we can update the details. We do not offer refunds or free revisions if the report was completed using incorrect details originally provided by the customer.</p>

          <h2>4. Refund Processing</h2>
          <p>Approved refunds will be processed and credited back to the original method of payment within 5-7 business days, depending on your bank or credit card issuer.</p>
        </div>
      </div>
    </div>
  )
}
