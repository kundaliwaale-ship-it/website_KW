'use client';

import React from 'react';
import styles from '../dashboard.module.css';

export default function UserOrdersPage() {
  const allOrders = [
    { id: 'ORD-001', service: 'Premium Kundli', status: 'In Progress', date: '01 Aug 2026', amount: '₹2,999' },
    { id: 'ORD-002', service: 'Digital Kundli', status: 'Delivered', date: '15 Jan 2026', amount: '₹299' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' };
      case 'In Progress': return { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' };
      case 'Pending': return { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' };
      default: return { bg: 'rgba(255, 255, 255, 0.1)', text: 'var(--text-primary)' };
    }
  };

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
              {allOrders.map((order) => {
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
