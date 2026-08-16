import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Kundaliwaale
            </Link>
            <p className="font-sans">
              Your trusted cosmic guide for Vedic astrology and Vastu. Finding clarity since 2010.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">Fb</a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">Ig</a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">Yt</a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">𝕏</a>
            </div>
          </div>

          {/* Combined Links */}
          <div>
            <h4 className={`${styles.columnTitle} font-sans`}>Explore</h4>
            <div className={styles.linksGrid}>
              <Link href="/" className={`${styles.columnLink} font-sans`}>Home</Link>
              <Link href="/services/kundali/detailed" className={`${styles.columnLink} font-sans`}>Kundli Reports</Link>
              <Link href="/about" className={`${styles.columnLink} font-sans`}>About Us</Link>
              <Link href="/services/vastu/online" className={`${styles.columnLink} font-sans`}>Vastu</Link>
              <Link href="/testimonials" className={`${styles.columnLink} font-sans`}>Testimonials</Link>
              <Link href="/services/consultation/standard" className={`${styles.columnLink} font-sans`}>Consultation</Link>
              <Link href="/faq" className={`${styles.columnLink} font-sans`}>FAQ</Link>
              <Link href="/contact" className={`${styles.columnLink} font-sans`}>Contact</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`${styles.columnTitle} font-sans`}>Contact Us</h4>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><Phone size={18} /></span>
              <span className="font-sans">+91 98765 43210</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><Mail size={18} /></span>
              <span className="font-sans">info@kundaliwaale.com</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><MapPin size={18} /></span>
              <span className="font-sans">123 Astro Tower, Connaught Place, ND</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={`${styles.copyright} font-sans`}>
            © {new Date().getFullYear()} Kundaliwaale. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="#" className="font-sans">Privacy Policy</Link>
            <Link href="#" className="font-sans">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating CTA */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappFloat}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </>
  );
}
