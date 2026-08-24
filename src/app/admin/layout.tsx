'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { LayoutDashboard, FileText, Sparkles, CreditCard, Users, LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/admin' },
  { icon: <FileText size={20} />, label: 'Kundli Orders', href: '/admin/orders' },
  { icon: <Sparkles size={20} />, label: 'Consultations', href: '/admin/consultations' },
  { icon: <CreditCard size={20} />, label: 'Payments', href: '/admin/payments' },
  { icon: <Users size={20} />, label: 'Customers', href: '/admin/customers' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className="font-serif">Admin Panel</h2>
          <p className="font-sans">Manage your business</p>
        </div>
        <nav>
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
