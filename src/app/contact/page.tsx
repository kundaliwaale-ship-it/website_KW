'use client';

import { CheckCircle, Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import styles from './contact.module.css';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className="font-serif">Get in <em>Touch</em></h1>
          <p className="font-sans">
            We&apos;re here to help you on your cosmic journey. Reach out with any questions.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.formCol}>
            <h2 className="font-serif">Send us a Message</h2>
            {submitted ? (
              <div className={styles.successMsg}>
                <span><CheckCircle size={48} color="var(--accent-green)" /></span>
                <h3 className="font-serif">Thank you!</h3>
                <p className="font-sans">Your message has been sent. We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className="font-sans">Full Name</label>
                  <input type="text" required placeholder="John Doe" className="font-sans" />
                </div>
                <div className={styles.formGroup}>
                  <label className="font-sans">Email Address</label>
                  <input type="email" required placeholder="john@example.com" className="font-sans" />
                </div>
                <div className={styles.formGroup}>
                  <label className="font-sans">Phone Number (Optional)</label>
                  <input type="tel" placeholder="+91 98765 00000" className="font-sans" />
                </div>
                <div className={styles.formGroup}>
                  <label className="font-sans">Subject</label>
                  <select className="font-sans">
                    <option>General Inquiry</option>
                    <option>Kundli Report Issue</option>
                    <option>Consultation Reschedule</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className="font-sans">Message</label>
                  <textarea required rows={5} placeholder="How can we help you?" className="font-sans"></textarea>
                </div>
                <Button variant="primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>SEND MESSAGE</Button>
              </form>
            )}
          </div>

          <div className={styles.infoCol}>
            <h2 className="font-serif">Contact Information</h2>
            <div className={styles.infoCards}>
              
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}><Phone size={24} /></span>
                <div>
                  <h4 className="font-sans">Phone</h4>
                  <p className="font-sans">+91 98765 43210</p>
                </div>
              </div>
              
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}><MessageCircle size={24} /></span>
                <div>
                  <h4 className="font-sans">WhatsApp</h4>
                  <p className="font-sans">+91 98765 43210</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoIcon}><Mail size={24} /></span>
                <div>
                  <h4 className="font-sans">Email</h4>
                  <p className="font-sans">info@kundaliwaale.com</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoIcon}><MapPin size={24} /></span>
                <div>
                  <h4 className="font-sans">Head Office</h4>
                  <p className="font-sans">123, Astro Tower, Connaught Place,<br/>New Delhi - 110001, India</p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6743!2d77.2167!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sConnaught+Place!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
