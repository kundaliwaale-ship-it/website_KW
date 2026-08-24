import React from 'react';
import styles from './dashboard.module.css';
import { FileText, IndianRupee, Sparkles, Users } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

const statusColors: Record<string, string> = {
  'Pending Payment': '#f59e0b',
  'Pending': '#f59e0b',
  'In Progress': '#3b82f6',
  'Shipped': '#a855f7',
  'Delivered': '#22c55e',
  'Completed': '#22c55e',
};

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch counts and revenue
  const { data: kundaliOrders } = await supabase.from('kundali_orders').select('*');
  const { data: vastuOrders } = await supabase.from('vastu_orders').select('*');
  const { data: consultationOrders } = await supabase.from('consultation_orders').select('*');
  const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

  const allOrders = [
    ...(kundaliOrders || []).map(o => ({ ...o, service_type: o.kundali_type, table: 'kundali' })),
    ...(vastuOrders || []).map(o => ({ ...o, service_type: o.vastu_type, table: 'vastu' })),
    ...(consultationOrders || []).map(o => ({ ...o, service_type: 'Consultation', table: 'consultation' })),
  ];

  const totalOrdersCount = allOrders.length;
  const totalRevenue = allOrders.reduce((sum, order) => sum + Number(order.amount || 0), 0);
  const pendingConsultations = (consultationOrders || []).filter(o => o.status === 'Pending').length;

  // Format currency
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  const stats = [
    { icon: <FileText size={32} />, label: 'Total Orders', value: totalOrdersCount.toString(), trend: '' },
    { icon: <IndianRupee size={32} />, label: 'Revenue', value: formatter.format(totalRevenue), trend: '' },
    { icon: <Sparkles size={32} />, label: 'Pending Consultations', value: pendingConsultations.toString(), trend: '' },
    { icon: <Users size={32} />, label: 'New Customers', value: userCount?.toString() || '0', trend: '' },
  ];

  // Sort all orders by date descending and take top 5
  const recentOrders = allOrders
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
    .slice(0, 5)
    .map(o => ({
      id: o.id.slice(0, 8).toUpperCase(),
      customer: o.full_name || o.name || 'Unknown',
      type: o.service_type,
      status: o.status || 'Pending Payment',
      date: new Date(o.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: formatter.format(o.amount)
    }));

  return (
    <div>
      <h1 className={`${styles.pageTitle} font-serif`}>Dashboard</h1>
      <p className={`${styles.pageSubtitle} font-sans`}>Welcome back, Kundaliwaale. Here&apos;s your business overview.</p>

      {/* Stat Cards */}
      <div className={styles.statsGrid}>
        {stats.map((s, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div>
              <p className={`${styles.statLabel} font-sans`}>{s.label}</p>
              <h3 className={`${styles.statValue} font-serif`}>{s.value}</h3>
            </div>
            {s.trend && <span className={`${styles.statTrend} font-sans`}>{s.trend}</span>}
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className={styles.tableSection}>
        <h2 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Orders</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className="font-sans">Order ID</th>
                <th className="font-sans">Customer</th>
                <th className="font-sans">Type</th>
                <th className="font-sans">Status</th>
                <th className="font-sans">Date</th>
                <th className="font-sans">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={i}>
                  <td className="font-sans" style={{ fontWeight: 600 }}>{order.id}</td>
                  <td className="font-sans">{order.customer}</td>
                  <td className="font-sans">{order.type}</td>
                  <td>
                    <span
                      className={`${styles.badge} font-sans`}
                      style={{ background: `${statusColors[order.status] || '#ccc'}20`, color: statusColors[order.status] || '#666' }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="font-sans">{order.date}</td>
                  <td className="font-sans" style={{ fontWeight: 600 }}>{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
