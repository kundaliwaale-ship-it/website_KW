'use client';

import React, { useEffect, useState } from 'react';
import styles from '../dashboard.module.css';
import { User as UserIcon, Mail, Phone, Calendar } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface ProfileData {
  full_name: string;
  phone_number: string;
  created_at: string;
}

export default function UserProfile() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setUser(user);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, phone_number, created_at')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      } else {
        // Fallback to user metadata if profile table doesn't exist
        setProfile({
          full_name: user.user_metadata?.full_name || 'N/A',
          phone_number: user.user_metadata?.phone_number || 'N/A',
          created_at: user.created_at,
        });
      }
      setLoading(false);
    };

    fetchProfileData();
  }, [supabase]);

  if (loading) {
     return <div className={styles.loadingState}>Loading profile data...</div>;
  }

  return (
    <div>
      <h1 className={`${styles.pageTitle} font-serif`}>My Profile</h1>
      <p className={`${styles.pageSubtitle} font-sans`}>
        Manage your personal information and cosmic identity.
      </p>

      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h3 className="font-serif">Personal Information</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', padding: '1rem 0' }}>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div className={styles.statIconWrapper} style={{ padding: '0.75rem' }}>
              <UserIcon size={24} />
            </div>
            <div>
              <div className="font-sans" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Full Name</div>
              <div className="font-sans" style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                {profile?.full_name || 'Not provided'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div className={styles.statIconWrapper} style={{ padding: '0.75rem' }}>
              <Mail size={24} />
            </div>
            <div>
              <div className="font-sans" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Email Address</div>
              <div className="font-sans" style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                {user?.email}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div className={styles.statIconWrapper} style={{ padding: '0.75rem' }}>
              <Phone size={24} />
            </div>
            <div>
              <div className="font-sans" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Phone Number</div>
              <div className="font-sans" style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                {profile?.phone_number || 'Not provided'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div className={styles.statIconWrapper} style={{ padding: '0.75rem' }}>
              <Calendar size={24} />
            </div>
            <div>
              <div className="font-sans" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Joined On</div>
              <div className="font-sans" style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Unknown'}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
