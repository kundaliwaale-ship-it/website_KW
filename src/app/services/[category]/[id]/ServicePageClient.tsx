'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { ArrowRight, ShieldCheck, Sparkles, Target, Gift, ScrollText } from 'lucide-react';
import BookingModal from './BookingModal';
import styles from './service.module.css';

export default function ServicePageClient({
  category,
  tier,
}: {
  category: string;
  tier: { id: string; name: string; price: number; originalPrice?: number; description: string; popular?: boolean; features: string[] };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroBgMap: Record<string, string> = {
    kundali: '/images/Astral BG/download (13).jpg',
    consultation: '/images/Astral BG/download (11).jpg',
    vastu: '/images/Astral BG/download (14).jpg',
  };

  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>

      {/* Cinematic Hero */}
      <section className={styles.cinematicHero}>
        <div className={`${styles.heroContent} relative-z`}>
          <div className={`${styles.heroGlassPanel} glass-card`}>
            <div className={`${styles.badge} font-sans`}>
              {tier.popular ? <><Sparkles size={14} /> Most Popular</> : <><Sparkles size={14} /> Premium Service</>}
            </div>
            <h1 className="font-serif">{tier.name}</h1>
            <p className="font-sans">{tier.description}</p>
            
            <div className={styles.heroCtaArea}>
              <div className={styles.priceContainer}>
                <span className={`${styles.price} font-serif`}>₹{tier.price}</span>
                {tier.originalPrice && <span className={`${styles.originalPrice} font-sans`}>₹{tier.originalPrice}</span>}
              </div>
              <Button variant="primary" onClick={() => setIsModalOpen(true)} className={styles.heroButton}>
                Book Now <ArrowRight size={20} />
              </Button>
            </div>
            <div className={styles.heroTrust}>
              <ShieldCheck size={18} className={styles.trustIcon} />
              <span className="font-sans">100% Satisfaction Guarantee • Authentic Vedic Astrology</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Box Features */}
      <section className={`${styles.bentoSection} relative-z`}>
        <div className={styles.sectionHeader}>
          <span className={`${styles.sectionLabel} font-sans`}>Everything You Get</span>
          <h2 className="font-serif">What&apos;s <em>Included</em></h2>
        </div>

        <div className={styles.bentoGrid}>
          {tier.features.map((feature: string, i: number) => {
            // Make the first item span wider
            const isWide = i === 0 || i === 3; 
            return (
              <div key={i} className={`${styles.bentoCard} glass-card ${isWide ? styles.bentoWide : ''}`}>
                <div className={styles.bentoIcon}>
                  {i % 3 === 0 ? <ScrollText size={24} /> : i % 3 === 1 ? <Target size={24} /> : <Gift size={24} />}
                </div>
                <div className={styles.bentoText}>
                  <p className="font-sans">{feature}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Glowing Vertical Timeline */}
      <section className={`${styles.processSection} relative-z`}>
        <div className={styles.sectionHeader}>
          <h2 className="font-serif">Journey to <em>Clarity</em></h2>
          <p className="font-sans">A simple, profoundly accurate process.</p>
        </div>

        <div className={styles.verticalTimeline}>
          <div className={styles.timelineLine}></div>
          
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}>1</div>
            <div className={`${styles.timelineContent} glass-card`}>
              <h3 className="font-serif">Provide Details</h3>
              <p className="font-sans">
                {category === 'kundali' && "Share your exact Birth Date, Time, and Location for precise calculation."}
                {category === 'vastu' && "Upload your floor plan and plot's directional facing."}
                {category === 'consultation' && "Select a convenient time slot and describe your main life concerns."}
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}>2</div>
            <div className={`${styles.timelineContent} glass-card`}>
              <h3 className="font-serif">Expert Analysis</h3>
              <p className="font-sans">
                Acharya Ji personally analyzes your data using authentic Vedic principles, hand-calculating every major aspect.
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}>3</div>
            <div className={`${styles.timelineContent} glass-card`}>
              <h3 className="font-serif">Receive Guidance</h3>
              <p className="font-sans">
                Access your handwritten report or join your 1-on-1 session to walk through precise, actionable remedies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Booking Bar */}
      <div className={`${styles.stickyBar} ${isScrolled ? styles.stickyVisible : ''} glass-card`}>
        <div className={styles.stickyInner}>
          <div className={styles.stickyInfo}>
            <h4 className="font-serif">{tier.name}</h4>
            <span className="font-serif">₹{tier.price}</span>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)} className={styles.stickyButton}>
            Book Now
          </Button>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={category}
        tier={tier.id}
        price={tier.price}
        serviceName={tier.name}
      />
    </div>
  );
}
