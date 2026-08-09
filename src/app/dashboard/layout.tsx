'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import { createClient } from '@/utils/supabase/client';
import { LayoutDashboard, FileText, Sparkles, User, LogOut } from 'lucide-react';

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Overview', href: '/dashboard' },
  { icon: <FileText size={20} />, label: 'My Orders', href: '/dashboard/orders' },
  { icon: <Sparkles size={20} />, label: 'Consultations', href: '/dashboard/consultations' },
  { icon: <User size={20} />, label: 'Profile Settings', href: '/dashboard/profile' },
];

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        router.push('/login');
      } else {
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'User');
        setLoading(false);
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  if (loading) {
    return <div className={styles.loadingState}>Loading your dashboard...</div>;
  }

  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className="font-serif">My Account</h2>
          <p className="font-sans">Welcome, {userName}</p>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ''} font-sans`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button className={`${styles.navLink} ${styles.logoutBtn} font-sans`} onClick={handleLogout}>
            <span className={styles.navIcon}><LogOut size={20} /></span>
            Log Out
          </button>
        </nav>
      </aside>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
