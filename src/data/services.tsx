import React from 'react';
import { FileText, Home, Sparkles } from 'lucide-react';

export const services = [
  {
    id: 'kundali',
    title: 'Premium Kundli Report',
    shortDescription: 'Get a detailed, handwritten Janam Kundli crafted by Kundaliwaale himself — covering life, career, love, health & more.',
    icon: <FileText size={48} color="var(--color-gold)" />,
    href: '/services/kundali',
    highlight: true,
  },
  {
    id: 'vastu',
    title: 'Vastu Consultation',
    shortDescription: 'Transform your home or office energy with expert Vastu analysis — available online or through a personal home visit.',
    icon: <Home size={48} color="var(--color-gold)" />,
    href: '/services/vastu',
    highlight: false,
  },
  {
    id: 'consultation',
    title: 'Astrology Consultation',
    shortDescription: 'Book a 1-on-1 consultation with Kundaliwaale to get personalized guidance on life decisions, relationships & career.',
    icon: <Sparkles size={48} color="var(--color-gold)" />,
    href: '/services/consultation',
    highlight: false,
  },
];

export const serviceDetails = {
  kundali: {
    tiers: [
      {
        id: 'detailed',
        name: 'Premium Handwritten Kundli',
        price: 2999,
        originalPrice: 4999,
        description: 'A comprehensive, handwritten Janam Kundli prepared by Kundaliwaale, delivered to your doorstep.',
        features: [
          'Handwritten by Kundaliwaale personally',
          'Complete Janam Kundli analysis',
          'Dasha analysis for 20+ years',
          'Career, Love & Health insights',
          'Remedial measures & gemstone suggestions',
          'Physical delivery via courier',
          'Order tracking updates via WhatsApp',
        ],
        deliveryType: 'physical',
        popular: true,
      },
      {
        id: 'short',
        name: 'Digital Kundli Report',
        price: 299,
        originalPrice: 599,
        description: 'A concise digital Kundli report with key life insights, delivered instantly via email.',
        features: [
          'Computer-generated with expert review',
          'Key planetary positions & insights',
          '5-year Dasha overview',
          'Basic career & relationship guidance',
          'PDF download + email delivery',
          'Instant delivery',
        ],
        deliveryType: 'digital',
        popular: false,
      },
    ],
  },
  vastu: {
    tiers: [
      {
        id: 'online',
        name: 'Online Vastu Analysis',
        price: 1499,
        originalPrice: 2499,
        description: 'Upload your home or office blueprint and receive a detailed Vastu analysis report.',
        features: [
          'Upload blueprint & house photos',
          'Detailed room-by-room analysis',
          'Directional corrections',
          'Remedial measures',
          'Report delivered via email',
          'One follow-up call included',
        ],
        deliveryType: 'digital',
        popular: true,
      },
      {
        id: 'home-visit',
        name: 'Home Visit Consultation',
        price: 4999,
        originalPrice: 7999,
        description: 'Kundaliwaale visits your home/office in person for a thorough on-site Vastu evaluation.',
        features: [
          'In-person visit by Kundaliwaale',
          'Complete property inspection',
          'On-site energy assessment',
          'Detailed written report',
          'Personalized remedies',
          'Two follow-up calls included',
          'Distance-based pricing may apply',
        ],
        deliveryType: 'physical',
        popular: false,
      },
    ],
  },
  consultation: {
    tiers: [
      {
        id: 'standard',
        name: 'Standard Consultation',
        price: 999,
        originalPrice: 1499,
        description: 'A 45-minute 1-on-1 video or phone consultation with Kundaliwaale.',
        features: [
          '45-minute session',
          'Video or phone call',
          'Personalized guidance',
          'Career, love & health focus',
          'Remedial suggestions',
          'Session recording shared',
        ],
        deliveryType: 'digital',
        popular: true,
      },
      {
        id: 'quick',
        name: '₹51 Quick Consultation',
        price: 51,
        originalPrice: 199,
        description: 'A quick introductory consultation — our Purohit calls you back within 24 hours.',
        features: [
          '15-minute phone consultation',
          'Purohit callback within 24hrs',
          'One focused question',
          'Basic guidance & remedy',
          'Upgrade option to full consultation',
        ],
        deliveryType: 'callback',
        popular: false,
      },
    ],
  },
};
