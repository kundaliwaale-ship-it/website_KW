import React from 'react';
import styles from '../dashboard.module.css';
import { createClient } from '@/utils/supabase/server';

const statusColors: Record<string, string> = { 
  'Pending Payment': '#f59e0b', 
  'Pending': '#f59e0b', 
  'In Progress': '#3b82f6', 
  'Shipped': '#a855f7', 
  'Delivered': '#22c55e' 
};

export default async function AdminOrders() {
  const supabase = await createClient();
  const { data: dbOrders } = await supabase
    .from('kundali_orders')
    .select('*')
    .order('created_at', { ascending: false });

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  const orders = (dbOrders || []).map(o => ({
    id: o.id.slice(0, 8).toUpperCase(),
    customer: o.full_name || 'Unknown',
    type: o.kundali_type,
    status: o.status || 'Pending Payment',
    date: new Date(o.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    amount: formatter.format(o.amount),
    phone: o.mobile_number_1 || 'N/A'
  }));

  return (
    <div>
      <h1 className={`${styles.pageTitle} font-serif`}>Kundli Orders</h1>
      <p className={`${styles.pageSubtitle} font-sans`}>Manage and track all Kundli order requests.</p>

      <div className={styles.tableSection}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className="font-sans">Order ID</th>
                <th className="font-sans">Customer</th>
                <th className="font-sans">Phone</th>
                <th className="font-sans">Type</th>
                <th className="font-sans">Status</th>
                <th className="font-sans">Date</th>
                <th className="font-sans">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i}>
                  <td className="font-sans" style={{ fontWeight: 600 }}>{o.id}</td>
                  <td className="font-sans">{o.customer}</td>
                  <td className="font-sans">{o.phone}</td>
                  <td className="font-sans">{o.type}</td>
                  <td>
                    <span className={`${styles.badge} font-sans`} style={{ background: `${statusColors[o.status] || '#ccc'}20`, color: statusColors[o.status] || '#666' }}>
                      {o.status}
                    </span>
                  </td>
                  <td className="font-sans">{o.date}</td>
                  <td className="font-sans" style={{ fontWeight: 600 }}>{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
