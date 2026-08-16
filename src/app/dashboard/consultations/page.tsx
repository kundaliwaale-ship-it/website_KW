'use client';

import React from 'react';
import styles from '../dashboard.module.css';
import Button from '@/components/ui/Button';

export default function UserConsultationsPage() {
  const allConsultations = [
    { id: 'APT-001', service: 'Astrology Consultation', date: '05 Aug 2026', time: '10:00 AM', status: 'Upcoming', link: 'https://zoom.us/j/123456789' },
    { id: 'APT-002', service: '₹51 Quick Consultation', date: '10 Jan 2026', time: 'Callback', status: 'Completed', link: null },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' };
      case 'Completed': return { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' };
      case 'Cancelled': return { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' };
      default: return { bg: 'rgba(255, 255, 255, 0.1)', text: 'var(--text-primary)' };
    }
  };

  return (
    <div>
      <h1 className={`${styles.pageTitle} font-serif`}>My Consultations</h1>
      <p className={`${styles.pageSubtitle} font-sans`}>View your upcoming appointments and past consultation history.</p>

      <div className={styles.sectionCard} style={{ padding: 0 }}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className="font-sans">Appointment ID</th>
                <th className="font-sans">Service</th>
                <th className="font-sans">Date & Time</th>
                <th className="font-sans">Status</th>
                <th className="font-sans">Action</th>
              </tr>
            </thead>
            <tbody>
              {allConsultations.map((apt) => {
                const colors = getStatusColor(apt.status);
                return (
                  <tr key={apt.id}>
                    <td className="font-sans" style={{ fontWeight: 600 }}>{apt.id}</td>
                    <td className="font-sans">{apt.service}</td>
                    <td className="font-sans">{apt.date} at {apt.time}</td>
                    <td>
                      <span className={`${styles.badge} font-sans`} style={{ background: colors.bg, color: colors.text }}>
                        {apt.status}
                      </span>
                    </td>
                    <td>
                      {apt.link ? (
                        <a href={apt.link} target="_blank" rel="noreferrer">
                          <Button variant="outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>Join Meeting</Button>
                        </a>
                      ) : (
                        <span className="font-sans" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>N/A</span>
                      )}
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
