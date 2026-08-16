'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { CheckCircle, ShieldCheck, ArrowRight, Play, FileText, Check } from 'lucide-react';
import BookingModal from './BookingModal';
import styles from './service.module.css';

export default function ServicePageClient({
  category,
  tier,
}: {
  category: string;
  tier: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const heroBgMap: Record<string, string> = {
    kundali: '/images/Astral BG/download (13).jpg',
    consultation: '/images/Astral BG/download (11).jpg',
    vastu: '/images/Astral BG/download (14).jpg',
  };

  return (
    <div className={styles.page}>
      {/* Split Hero */}
      <section
        className={styles.hero}
        style={{
          backgroundImage: `radial-gradient(ellipse at 30% 50%, rgba(255, 255, 255, 0.85) 0%, rgba(250, 250, 252, 0.92) 70%, rgba(240, 240, 245, 0.98) 100%), url('${heroBgMap[category] || ''}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <div className={`${styles.badge} font-sans`}>
              {tier.popular ? 'Most Popular' : 'Premium Service'}
            </div>
            <h1 className="font-serif">{tier.name}</h1>
            <p className="font-sans">{tier.description}</p>

            <div className={styles.priceContainer}>
              <span className={`${styles.price} font-serif`}>₹{tier.price}</span>
              <span className={`${styles.originalPrice} font-sans`}>₹{tier.originalPrice}</span>
            </div>

            <div className={styles.ctaGroup}>
              <Button variant="primary" onClick={() => setIsModalOpen(true)} style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
                Book Now <ArrowRight size={20} style={{ marginLeft: '10px' }} />
              </Button>
              <div className={styles.heroTrust}>
                <ShieldCheck size={20} className={styles.trustIcon} />
                <span className="font-sans">100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.cosmicGradient}></div>
            <div className={styles.floatingCard}>
              <div className={styles.cardWatermarkWrapper}>
                <img src="/images/vedic_chakra.png" alt="Chakra watermark" className={styles.cardWatermark} />
              </div>
              <div className={styles.cardInnerBorder}>
                <h3 className="font-serif">{tier.name}</h3>
                <div className={styles.cardPrice}>₹{tier.price}</div>
                <div className={styles.cardDivider}></div>
                <ul className={styles.cardFeatures}>
                  {tier.features.slice(0, 3).map((f: string, i: number) => (
                    <li key={i}><Check size={16} /> {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey to Clarity */}
      <section className={styles.processSection}>
        <div className={styles.sectionHeader}>
          <h2 className="font-serif">Journey to Clarity</h2>
          <p className="font-sans">A simple, transparent, and profoundly accurate process.</p>
        </div>

        <div className={styles.timelineContainer}>
          <div className={styles.goldenThread}></div>

          <div className={styles.timelineStep}>
            <div className={styles.timelineNode}>1</div>
            <div className={styles.timelineContent}>
              <h3 className="font-serif">Provide Your Details</h3>
              <p className="font-sans">
                {category === 'kundali' && "Share your precise Birth Date, Time, and Location. Accuracy here is vital for calculating exact planetary positions."}
                {category === 'vastu' && "Upload your property's floor plan (PDF/Image) along with the plot's directional facing and your primary concerns."}
                {category === 'consultation' && "Select a convenient time slot from our calendar and briefly describe the life areas you wish to discuss."}
              </p>
            </div>
          </div>

          <div className={styles.timelineStep}>
            <div className={styles.timelineNode}>2</div>
            <div className={styles.timelineContent}>
              <h3 className="font-serif">Expert Analysis</h3>
              <p className="font-sans">
                Acharya Ji dedicates time to personally analyze your data using authentic Vedic principles. Every chart is drawn and interpreted manually to ensure deeply accurate, highly personalized insights.
              </p>
            </div>
          </div>

          <div className={styles.timelineStep}>
            <div className={styles.timelineNode}>3</div>
            <div className={styles.timelineContent}>
              <h3 className="font-serif">Receive Your Guidance</h3>
              <p className="font-sans">
                Access your premium handwritten report directly via your dashboard, or connect with Acharya Ji for your scheduled 1-on-1 session to walk through your remedies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresInner}>
          <div className={styles.featuresHeader}>
            <span className={`${styles.sectionLabel} font-sans`}>Everything You Get</span>
            <h2 className="font-serif">What's <em>Included</em></h2>
            <p className="font-sans">Every package is crafted with precision and delivered with care.</p>
          </div>
          <div className={styles.featuresGrid}>
            {tier.features.map((feature: string, i: number) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureNumber}>{String(i + 1).padStart(2, '0')}</div>
                <div className={styles.featureText}>
                  <span className="font-sans">{feature}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.featuresCta}>
            <div className={styles.ctaRow}>
              <div className={styles.ctaInfo}>
                <h3 className="font-serif">Ready to begin your journey?</h3>
                <p className="font-sans">Book now and get your personalized guidance within 48 hours.</p>
              </div>
              <Button variant="primary" onClick={() => setIsModalOpen(true)} style={{ padding: '1rem 2.5rem', background: '#FFFFFF', color: '#E2A03F', border: 'none' }}>
                Start Your Journey <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </Button>
            </div>
          </div>
        </div>
      </section>

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
