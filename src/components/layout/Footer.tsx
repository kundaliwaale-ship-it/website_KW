'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
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
              Your trusted cosmic guide. Handcrafted authentic Vedic Kundlis delivered directly to your doorstep.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16.11 7.992h.01"/><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`${styles.columnTitle} font-sans`}>Contact Us</h4>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><Phone size={18} /></span>
              <span className="font-sans">+91 620 381 9040</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><Mail size={18} /></span>
              <span className="font-sans">contact@kundaliwaale.com</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><MapPin size={18} /></span>
              <span className="font-sans">Ranchi, Jharkhand, India</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={`${styles.copyright} font-sans`}>
            © {new Date().getFullYear()} Kundaliwaale. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className="font-sans">Privacy Policy</Link>
            <Link href="/terms" className="font-sans">Terms of Service</Link>
            <Link href="/refund" className="font-sans">Refund Policy</Link>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating CTA - Only on Homepage */}
      {isHomepage && (
        <a
          href="https://wa.me/916203819040"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappFloat}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      )}
    </>
  );
}
