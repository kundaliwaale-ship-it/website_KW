'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import Button from '../ui/Button';
import { ChevronDown } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';

const navItems = [
  {
    label: 'Reports',
    dropdown: [
      { label: 'Premium Kundli', href: '/services/kundali/detailed' },
      { label: 'Digital Kundli', href: '/services/kundali/short' },
    ],
  },
  {
    label: 'Consultation',
    dropdown: [
      { label: 'Astrology Consultation', href: '/services/consultation/standard' },
      { label: '₹51 Quick Consultation', href: '/services/consultation/quick' },
    ],
  },
  {
    label: 'Vastu',
    dropdown: [
      { label: 'Online Analysis', href: '/services/vastu/online' },
      { label: 'Home Visit', href: '/services/vastu/home-visit' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const pathname = usePathname();
  const { locale, setLocale, dict } = useLanguage();

  const getNavTranslation = (label: string) => {
    switch(label) {
      case 'Reports': return dict.nav.reports;
      case 'Premium Kundli': return dict.nav.reports_premium;
      case 'Digital Kundli': return dict.nav.reports_digital;
      case 'Consultation': return dict.nav.consultation;
      case 'Astrology Consultation': return dict.nav.consultation_astrology;
      case '₹51 Quick Consultation': return dict.nav.consultation_quick;
      case 'Vastu': return dict.nav.vastu;
      case 'Online Analysis': return dict.nav.vastu_online;
      case 'Home Visit': return dict.nav.vastu_home;
      case 'About': return dict.nav.about;
      case 'Testimonials': return dict.nav.testimonials;
      case 'Contact': return dict.nav.contact;
      case 'FAQ': return dict.nav.faq;
      default: return label;
    }
  };

  const dashboardHref = '/dashboard';
  const dashboardLabel = 'DASHBOARD';

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Auth state setup
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (data.user) {
        // Any profile-specific fetching can go here
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <Link href="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
          <span className="font-serif">Kundaliwaale</span>
          <small className="font-sans">Your Cosmic Guide</small>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopLinks}>
          {navItems.map((item) => (
            <div key={item.label} className={styles.navItem}>
              {item.dropdown ? (
                <>
                  <button className={`${styles.link} font-sans`}>
                    {getNavTranslation(item.label)}
                    <span className={styles.linkArrow}><ChevronDown size={14} /></span>
                  </button>
                  <div className={styles.dropdown}>
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className={`${styles.dropdownLink} font-sans`}
                      >
                        {getNavTranslation(sub.label)}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={item.href!} className={`${styles.link} font-sans`}>
                  {getNavTranslation(item.label)}
                </Link>
              )}
            </div>
          ))}
          <div className={styles.loginBtn} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {user ? (
              <Link href={dashboardHref}>
                <Button variant="primary">{dict.nav.dashboard}</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="primary">{dict.nav.login}</Button>
              </Link>
            )}
            <button 
               onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
               className="font-sans"
               style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, padding: 0, letterSpacing: '0.05em' }}
               title={locale === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            >
              {locale === 'en' ? 'HI' : 'EN'}
            </button>
          </div>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayVisible : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileOpen ? styles.mobileDrawerOpen : ''}`}>
        {navItems.map((item) => (
          <div key={item.label}>
            {item.dropdown ? (
              <>
                <span className={`${styles.mobileLink} font-sans`}>{getNavTranslation(item.label)}</span>
                {item.dropdown.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    className={`${styles.mobileSubLink} font-sans`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {getNavTranslation(sub.label)}
                  </Link>
                ))}
              </>
            ) : (
              <Link
                href={item.href!}
                className={`${styles.mobileLink} font-sans`}
                onClick={() => setMobileOpen(false)}
              >
                {getNavTranslation(item.label)}
              </Link>
            )}
          </div>
        ))}
        <div className={styles.mobileLoginBtn} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            {user ? (
              <Link href={dashboardHref}>
                <Button variant="primary" style={{ width: '100%' }}>{dict.nav.dashboard}</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="primary" style={{ width: '100%' }}>{dict.nav.login}</Button>
              </Link>
            )}
          </div>
          <button 
             onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
             className="font-sans"
             style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 600, padding: '0.5rem' }}
          >
            {locale === 'en' ? 'HI' : 'EN'}
          </button>
        </div>
      </div>
    </>
  );
}
