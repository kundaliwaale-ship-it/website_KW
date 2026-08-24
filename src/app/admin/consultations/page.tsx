import React from 'react';
import styles from '../dashboard.module.css';
import { createClient } from '@/utils/supabase/server';

const statusColors: Record<string, string> = { 
  'Pending Payment': '#f59e0b',
  'Pending': '#f59e0b',
  'Confirmed': '#22c55e', 
  'Pending Callback': '#f59e0b', 
  'Scheduled': '#3b82f6', 
  'Completed': '#22c55e' 
};

export default async function AdminConsultations() {
  const supabase = await createClient();
  const { data: dbConsultations } = await supabase
    .from('consultation_orders')
    .select('*')
    .order('created_at', { ascending: false });

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  const consultations = (dbConsultations || []).map(c => {
    const d = new Date(c.selected_time || c.created_at);
    return {
      id: c.id.slice(0, 8).toUpperCase(),
      customer: c.name || 'Unknown',
      type: 'Consultation', // We can derive type if needed from amount or other fields
      date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: c.status || 'Pending Payment',
      amount: formatter.format(c.amount),
    };
  });

  return (
    <div>
      <h1 className={`${styles.pageTitle} font-serif`}>Consultations</h1>
      <p className={`${styles.pageSubtitle} font-sans`}>Manage appointments and Vastu consultation requests.</p>

      <div className={styles.tableSection}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className="font-sans">ID</th>
                <th className="font-sans">Customer</th>
                <th className="font-sans">Type</th>
                <th className="font-sans">Date</th>
                <th className="font-sans">Time</th>
                <th className="font-sans">Status</th>
                <th className="font-sans">Amount</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((c, i) => (
                <tr key={i}>
                  <td className="font-sans" style={{ fontWeight: 600 }}>{c.id}</td>
                  <td className="font-sans">{c.customer}</td>
                  <td className="font-sans">{c.type}</td>
                  <td className="font-sans">{c.date}</td>
                  <td className="font-sans">{c.time}</td>
                  <td>
                    <span className={`${styles.badge} font-sans`} style={{ background: `${statusColors[c.status] || '#ccc'}20`, color: statusColors[c.status] || '#666' }}>
                      {c.status}
                    </span>
                  </td>
                  <td className="font-sans" style={{ fontWeight: 600 }}>{c.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
