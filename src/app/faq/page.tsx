import React from 'react';
import type { Metadata } from 'next';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about our Kundli reports, Vastu consultations, astrology services, payments, and delivery.',
};

export default function FaqPage() {
  return <FaqClient />;
}
