'use client';

import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import { FileText, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface Order {
  id: string;
  service: string;
  date: string;
  status: string;
}

export default function UserDashboardOverview() {
  const supabase = createClient();
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
          service: `Kundali (${o.kundali_type})`,
          date: new Date(o.created_at).toLocaleDateString(),
          status: o.status
        })));
      }

      if (consultRes.data) {
        allOrders.push(...consultRes.data.map((o: { id: string; selected_time: string; status: string; created_at: string }) => ({
          id: o.id.split('-')[0],
          service: `Consultation`,
          date: new Date(o.created_at).toLocaleDateString(),
          status: o.status
        })));
      }

      if (vastuRes.data) {
        allOrders.push(...vastuRes.data.map((o: { id: string; vastu_type: string; status: string; created_at: string }) => ({
          id: o.id.split('-')[0],
          service: `Vastu (${o.vastu_type})`,
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
     return <div className={styles.loadingState}>Loading dashboard data...</div>;
  }

  return (
    <div>
      <h1 className={`${styles.pageTitle} font-serif`}>Welcome back!</h1>
      <p className={`${styles.pageSubtitle} font-sans`}>
        You are securely logged in as <strong>{user?.email}</strong>. Here is a summary of your recent activity and orders.
      </p>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FileText size={32} color="var(--color-gold)" /></div>
          <div>
            <p className={`${styles.statLabel} font-sans`}>Total Orders</p>
            <h3 className={`${styles.statValue} font-serif`}>{recentOrders.length}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Sparkles size={32} color="var(--color-gold)" /></div>
          <div>
            <p className={`${styles.statLabel} font-sans`}>Active Services</p>
            <h3 className={`${styles.statValue} font-serif`}>{recentOrders.filter(o => o.status !== 'Completed' && o.status !== 'Delivered').length}</h3>
          </div>
        </div>
      </div>

      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h3 className="font-serif">Recent Orders & Activity</h3>
        </div>
        
        {recentOrders.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className="font-sans">Order ID</th>
                  <th className="font-sans">Service</th>
                  <th className="font-sans">Date</th>
                  <th className="font-sans">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr key={idx}>
                    <td className="font-sans" style={{ fontWeight: 600 }}>#{order.id.toUpperCase()}</td>
                    <td className="font-sans">{order.service}</td>
                    <td className="font-sans">{order.date}</td>
                    <td>
                      <span className={`${styles.badge} font-sans`} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
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
            <AlertCircle size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem' }} />
            <p className="font-sans">You don&apos;t have any orders or consultations yet.</p>
            <Link href="/services/kundali">
               <button style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--color-gold)', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Explore Services</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
