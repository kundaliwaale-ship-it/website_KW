'use client';

import { CheckCircle, Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import styles from './contact.module.css';
import Button from '@/components/ui/Button';
import { submitContactInquiry } from '@/actions/contact';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ContactPage() {
  const { dict } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await submitContactInquiry(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setSubmitted(true);
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>
      <section className={`${styles.hero} relative-z`}>
        <div className={styles.heroInner}>
          <h1 className="font-serif thread-heading">{dict.contact_page.hero.title_1} <em>{dict.contact_page.hero.title_em}</em></h1>
        </div>
      </section>

      <section className={`${styles.content} relative-z`}>
        <div className={styles.contentInner}>
          <div className={`${styles.formCol} glass-card`}>
            <h2 className="font-serif">{dict.contact_page.form.title}</h2>
            {submitted ? (
              <div className={styles.successMsg}>
                <span><CheckCircle size={48} color="var(--accent-green)" /></span>
                <h3 className="font-serif">{dict.contact_page.form.success_msg}</h3>
                <p className="font-sans">{dict.contact_page.form.success_desc}</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className="font-sans">{dict.contact_page.form.name_label}</label>
                    <input type="text" name="fullName" required placeholder="John Doe" className="font-sans" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className="font-sans">{dict.contact_page.form.email_label}</label>
                    <input type="email" name="email" required placeholder="john@example.com" className="font-sans" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className="font-sans">{dict.contact_page.form.phone_label}</label>
                  <input type="tel" name="phone" placeholder="+91 98765 00000" className="font-sans" />
                </div>
                <div className={styles.formGroup}>
                  <label className="font-sans">{dict.contact_page.form.subject_label}</label>
                  <select name="subject" className="font-sans">
                    <option>{dict.contact_page.form.subjects.gen}</option>
                    <option>{dict.contact_page.form.subjects.issue}</option>
                    <option>{dict.contact_page.form.subjects.reschedule}</option>
                    <option>{dict.contact_page.form.subjects.other}</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className="font-sans">{dict.contact_page.form.msg_label}</label>
                  <textarea name="message" required rows={4} placeholder={dict.contact_page.form.msg_placeholder} className="font-sans"></textarea>
                </div>
                {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
                <Button 
                  variant="primary" 
                  style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
                  disabled={loading}
                >
                  {loading ? dict.contact_page.form.btn_sending : dict.contact_page.form.btn_send}
                </Button>
              </form>
            )}
          </div>

          <div className={`${styles.infoCol} glass-card`}>
            <h2 className="font-serif">{dict.contact_page.info.title}</h2>
            <div className={styles.infoCards}>
              
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}><Phone size={24} /></span>
                <div>
                  <h4 className="font-sans">{dict.contact_page.info.phone}</h4>
                  <p className="font-sans">+91 98765 43210</p>
                </div>
              </div>
              
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}><MessageCircle size={24} /></span>
                <div>
                  <h4 className="font-sans">{dict.contact_page.info.whatsapp}</h4>
                  <p className="font-sans">+91 98765 43210</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoIcon}><Mail size={24} /></span>
                <div>
                  <h4 className="font-sans">{dict.contact_page.info.email}</h4>
                  <p className="font-sans">info@kundaliwaale.com</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoIcon}><MapPin size={24} /></span>
                <div>
                  <h4 className="font-sans">{dict.contact_page.info.address}</h4>
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
