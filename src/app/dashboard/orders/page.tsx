'use client';

import React, { useEffect, useState } from 'react';
import styles from '../dashboard.module.css';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface OrderData {
  id: string;
  service: string;
  status: string;
  date: string;
  amount: string;
  sortDate: Date;
}

export default function UserOrdersPage() {
  const supabase = createClient();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const [kundaliRes, vastuRes] = await Promise.all([
        supabase.from('kundali_orders').select('*').eq('user_id', user.id),
        supabase.from('vastu_orders').select('*').eq('user_id', user.id),
      ]);

      const fetchedOrders: OrderData[] = [];

      if (kundaliRes.data) {
        fetchedOrders.push(...kundaliRes.data.map(o => ({
          id: o.id.split('-')[0].toUpperCase(),
          service: `Kundali (${o.kundali_type})`,
          status: o.status,
          date: new Date(o.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          amount: `₹${o.amount}`,
          sortDate: new Date(o.created_at)
        })));
      }

      if (vastuRes.data) {
        fetchedOrders.push(...vastuRes.data.map(o => ({
          id: o.id.split('-')[0].toUpperCase(),
          service: `Vastu (${o.vastu_type})`,
          status: o.status,
          date: new Date(o.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          amount: `₹${o.amount}`,
          sortDate: new Date(o.created_at)
        })));
      }

      fetchedOrders.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());
      setOrders(fetchedOrders);
      setLoading(false);
    };

    fetchOrders();
  }, [supabase]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' };
      case 'In Progress': return { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' };
      case 'Pending': return { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' };
      default: return { bg: 'rgba(255, 255, 255, 0.1)', text: 'var(--text-primary)' };
    }
  };

  if (loading) {
    return <div className={styles.loadingState}>Loading orders...</div>;
  }

  return (
    <div>
      <h1 className={`${styles.pageTitle} font-serif`}>My Orders</h1>
      <p className={`${styles.pageSubtitle} font-sans`}>Track the status of your requested reports and services.</p>

      <div className={styles.sectionCard} style={{ padding: 0 }}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className="font-sans">Order ID</th>
                <th className="font-sans">Service</th>
                <th className="font-sans">Date</th>
                <th className="font-sans">Amount</th>
                <th className="font-sans">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? orders.map((order) => {
                const colors = getStatusColor(order.status);
                return (
                  <tr key={order.id}>
                    <td className="font-sans" style={{ fontWeight: 600 }}>{order.id}</td>
                    <td className="font-sans">{order.service}</td>
                    <td className="font-sans">{order.date}</td>
                    <td className="font-sans">{order.amount}</td>
                    <td>
                      <span className={`${styles.badge} font-sans`} style={{ background: colors.bg, color: colors.text }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={5} className="font-sans" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    You have not placed any orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
