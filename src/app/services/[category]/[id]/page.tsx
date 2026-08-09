import React from 'react';
import { notFound } from 'next/navigation';
import { serviceDetails } from '@/data/services';
import ServicePageClient from './ServicePageClient';

export async function generateMetadata({ params }: { params: Promise<{ category: string; id: string }> }) {
  const resolvedParams = await params;
  const categoryData = serviceDetails[resolvedParams.category as keyof typeof serviceDetails];
  if (!categoryData) return { title: 'Not Found' };
  const tier = categoryData.tiers.find(t => t.id === resolvedParams.id);
  if (!tier) return { title: 'Not Found' };

  return {
    title: `${tier.name} | Kundaliwaale`,
    description: tier.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const resolvedParams = await params;
  const categoryData = serviceDetails[resolvedParams.category as keyof typeof serviceDetails];
  if (!categoryData) return notFound();
  
  const tier = categoryData.tiers.find(t => t.id === resolvedParams.id);
  if (!tier) return notFound();

  return <ServicePageClient category={resolvedParams.category} tier={tier} />;
}
