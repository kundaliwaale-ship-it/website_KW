'use client';

import React, { useEffect, useState } from 'react';
import styles from '../dashboard.module.css';
import Button from '@/components/ui/Button';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface ConsultData {
  id: string;
  service: string;
  date: string;
  time: string;
  status: string;
  link: string | null;
  sortDate: Date;
}

export default function UserConsultationsPage() {
  const supabase = createClient();
  const [consultations, setConsultations] = useState<ConsultData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('consultation_orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setConsultations(data.map(o => {
          const selectedTime = new Date(o.selected_time);
          return {
            id: o.id.split('-')[0].toUpperCase(),
            service: 'Astrology Consultation',
            date: selectedTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: o.status,
            link: null, // Depending on backend this could be added to DB later
            sortDate: new Date(o.created_at)
          };
        }));
      }
      setLoading(false);
    };

    fetchConsultations();
  }, [supabase]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' };
      case 'Completed': return { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' };
      case 'Cancelled': return { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' };
      default: return { bg: 'rgba(255, 255, 255, 0.1)', text: 'var(--text-primary)' };
    }
  };

  if (loading) {
    return <div className={styles.loadingState}>Loading consultations...</div>;
  }

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
              {consultations.length > 0 ? consultations.map((apt) => {
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
              }) : (
                <tr>
                  <td colSpan={5} className="font-sans" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    You do not have any consultations yet.
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
