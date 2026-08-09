'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import Button from '../ui/Button';
import { ChevronDown } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Auth state setup
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
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
                    {item.label}
                    <span className={styles.linkArrow}><ChevronDown size={14} /></span>
                  </button>
                  <div className={styles.dropdown}>
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className={`${styles.dropdownLink} font-sans`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={item.href!} className={`${styles.link} font-sans`}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className={styles.loginBtn}>
            {user ? (
              <Link href="/dashboard">
                <Button variant="primary">DASHBOARD</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="primary">LOGIN</Button>
              </Link>
            )}
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
                <span className={`${styles.mobileLink} font-sans`}>{item.label}</span>
                {item.dropdown.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    className={`${styles.mobileSubLink} font-sans`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {sub.label}
                  </Link>
                ))}
              </>
            ) : (
              <Link
                href={item.href!}
                className={`${styles.mobileLink} font-sans`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
        <div className={styles.mobileLoginBtn}>
          {user ? (
            <Link href="/dashboard">
              <Button variant="primary" style={{ width: '100%' }}>DASHBOARD</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="primary" style={{ width: '100%' }}>LOGIN</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
