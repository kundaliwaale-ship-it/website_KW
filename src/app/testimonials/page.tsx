import React from 'react';
import type { Metadata } from 'next';
import TestimonialsClient from './TestimonialsClient';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Read real reviews and success stories from our customers who have experienced the power of Vedic astrology.',
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
