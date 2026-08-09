import React from 'react';
import styles from './dashboard.module.css';

import { FileText, IndianRupee, Sparkles, Users } from 'lucide-react';

const stats = [
  { icon: <FileText size={32} />, label: 'Total Orders', value: '1,247', trend: '+12%' },
  { icon: <IndianRupee size={32} />, label: 'Revenue', value: '₹18.5L', trend: '+8%' },
  { icon: <Sparkles size={32} />, label: 'Pending Consultations', value: '23', trend: '' },
  { icon: <Users size={32} />, label: 'New Customers', value: '156', trend: '+5%' },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Priya Sharma', type: 'Premium Kundli', status: 'In Progress', date: '01 Aug 2026', amount: '₹2,999' },
  { id: 'ORD-002', customer: 'Rajesh Kumar', type: 'Digital Kundli', status: 'Delivered', date: '31 Jul 2026', amount: '₹299' },
  { id: 'ORD-003', customer: 'Anita Desai', type: 'Vastu Online', status: 'Pending', date: '31 Jul 2026', amount: '₹1,499' },
  { id: 'ORD-004', customer: 'Vikram Singh', type: 'Premium Kundli', status: 'Shipped', date: '30 Jul 2026', amount: '₹2,999' },
  { id: 'ORD-005', customer: 'Meera Patel', type: 'Consultation', status: 'Completed', date: '30 Jul 2026', amount: '₹999' },
];

const statusColors: Record<string, string> = {
  'Pending': '#f59e0b',
  'In Progress': '#3b82f6',
  'Shipped': '#a855f7',
  'Delivered': '#22c55e',
  'Completed': '#22c55e',
};

export default function AdminDashboard() {
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
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-sans" style={{ fontWeight: 600 }}>{order.id}</td>
                  <td className="font-sans">{order.customer}</td>
                  <td className="font-sans">{order.type}</td>
                  <td>
                    <span
                      className={`${styles.badge} font-sans`}
                      style={{ background: `${statusColors[order.status]}20`, color: statusColors[order.status] }}
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
