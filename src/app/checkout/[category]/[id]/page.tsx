import React from 'react';
import { notFound } from 'next/navigation';
import { serviceDetails } from '@/data/services';
import CheckoutClient from './CheckoutClient';

export async function generateMetadata({ params }: { params: Promise<{ category: string; id: string }> }) {
  const resolvedParams = await params;
  const categoryData = serviceDetails[resolvedParams.category as keyof typeof serviceDetails];
  if (!categoryData) return { title: 'Not Found' };
  const tier = categoryData.tiers.find(t => t.id === resolvedParams.id);
  if (!tier) return { title: 'Not Found' };

  return {
    title: `Checkout | ${tier.name} | Kundaliwaale`,
    description: `Complete your booking for ${tier.name}`,
  };
}

export default async function CheckoutPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const resolvedParams = await params;
  const categoryData = serviceDetails[resolvedParams.category as keyof typeof serviceDetails];
  if (!categoryData) return notFound();
  
  const tier = categoryData.tiers.find(t => t.id === resolvedParams.id);
  if (!tier) return notFound();

  return <CheckoutClient category={resolvedParams.category} tier={tier} />;
}
