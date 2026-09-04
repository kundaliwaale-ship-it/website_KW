'use client';

import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import { FileText, Sparkles, Compass } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useLanguage } from '@/i18n/LanguageContext';

interface Order {
  id: string;
  service: string;
  date: string;
  status: string;
}

export default function UserDashboardOverview() {
  const supabase = createClient();
  const { dict } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setUser(user);

      // Fetch from all 3 tables
      const [kundaliRes, consultRes, vastuRes] = await Promise.all([
        supabase.from('kundali_orders').select('id, kundali_type, status, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3),
        supabase.from('consultation_orders').select('id, selected_time, status, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3),
        supabase.from('vastu_orders').select('id, vastu_type, status, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3),
      ]);

      const allOrders: Order[] = [];

      if (kundaliRes.data) {
        allOrders.push(...kundaliRes.data.map((o: { id: string; kundali_type: string; status: string; created_at: string }) => ({
          id: o.id.split('-')[0], // shorten uuid for display
          service: `${dict.dashboard_page.services.kundali} (${o.kundali_type})`,
          date: new Date(o.created_at).toLocaleDateString(),
          status: o.status
        })));
      }

      if (consultRes.data) {
        allOrders.push(...consultRes.data.map((o: { id: string; selected_time: string; status: string; created_at: string }) => ({
          id: o.id.split('-')[0],
          service: dict.dashboard_page.services.consultation,
          date: new Date(o.created_at).toLocaleDateString(),
          status: o.status
        })));
      }

      if (vastuRes.data) {
        allOrders.push(...vastuRes.data.map((o: { id: string; vastu_type: string; status: string; created_at: string }) => ({
          id: o.id.split('-')[0],
          service: `${dict.dashboard_page.services.vastu} (${o.vastu_type})`,
          date: new Date(o.created_at).toLocaleDateString(),
          status: o.status
        })));
      }

      // Sort combined by date descending
      allOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setRecentOrders(allOrders);
      setLoading(false);
    };

    fetchDashboardData();
  }, [supabase]);

  if (loading) {
     return <div className={styles.loadingState}>{dict.dashboard_page.loading}</div>;
  }

  const activeServicesCount = recentOrders.filter(o => o.status !== 'Completed' && o.status !== 'Delivered').length;

  return (
    <div>
      <h1 className={`${styles.pageTitle} font-serif`}>{dict.dashboard_page.welcome}</h1>
      <p className={`${styles.pageSubtitle} font-sans`}>
        {dict.dashboard_page.subtitle} <strong>{user?.email}</strong>{dict.dashboard_page.subtitle_after}
      </p>

      {/* Unified At-a-Glance Stats */}
      <div className={styles.statsContainer}>
        <div className={styles.statBlock}>
          <div className={styles.statIconWrapper}>
            <FileText size={28} />
          </div>
          <div>
            <div className={`${styles.statLabel} font-sans`}>{dict.dashboard_page.total_orders}</div>
            <div className={`${styles.statValue} font-serif`}>{recentOrders.length}</div>
          </div>
        </div>
        
        <div className={styles.statDivider}></div>
        
        <div className={styles.statBlock}>
          <div className={styles.statIconWrapper}>
            <Sparkles size={28} />
          </div>
          <div>
            <div className={`${styles.statLabel} font-sans`}>{dict.dashboard_page.active_services}</div>
            <div className={`${styles.statValue} font-serif`}>{activeServicesCount}</div>
          </div>
        </div>
      </div>

      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h3 className="font-serif">{dict.dashboard_page.recent_activity}</h3>
        </div>
        
        {recentOrders.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className="font-sans">{dict.dashboard_page.table.order_id}</th>
                  <th className="font-sans">{dict.dashboard_page.table.service}</th>
                  <th className="font-sans">{dict.dashboard_page.table.date}</th>
                  <th className="font-sans">{dict.dashboard_page.table.status}</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr key={idx}>
                    <td className="font-sans" style={{ fontWeight: 600 }}>#{order.id.toUpperCase()}</td>
                    <td className="font-sans">{order.service}</td>
                    <td className="font-sans">{order.date}</td>
                    <td>
                      <span className={`${styles.badge} font-sans`} style={{ background: 'rgba(226, 160, 63, 0.1)', color: 'var(--color-gold)' }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
              <Compass size={40} />
            </div>
            <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{dict.dashboard_page.empty.title}</h3>
            <p className="font-sans">
              {dict.dashboard_page.empty.desc}
            </p>
            <Link href="/services/kundali">
               <button style={{ padding: '0.8rem 1.5rem', background: 'var(--button-gradient)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(226, 160, 63, 0.2)' }}>
                 {dict.dashboard_page.empty.btn}
               </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
