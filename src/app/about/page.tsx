import React from 'react';
import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Discover Kundaliwaale — bringing the finest authentic, handwritten Vedic Kundlis and genuine astrology guidance directly to your doorstep.',
};

export default function AboutPage() {
  return <AboutClient />;
}
