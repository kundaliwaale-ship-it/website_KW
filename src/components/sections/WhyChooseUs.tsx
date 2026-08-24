import React from 'react';
import { Target, FileText, PenTool, ShieldCheck } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const reasons = [
  {
    icon: <PenTool size={32} color="var(--color-gold)" />,
    title: 'Delivered to Your Home',
    description: 'Now you can receive authentic, personally handwritten Janam Kundlis safely packaged and delivered to your doorstep.',
  },
  {
    icon: <FileText size={32} color="var(--color-gold)" />,
    title: '100% Handwritten Quality',
    description: 'Every Kundli is meticulously written by hand using traditional calculations — never automated generic PDFs.',
  },
  {
    icon: <Target size={32} color="var(--color-gold)" />,
    title: 'Certified Jyotish Acharyas',
    description: 'Prepared with deep scriptural authority and exact mathematical precision by recognized Jyotish scholars.',
  },
  {
    icon: <ShieldCheck size={32} color="var(--color-gold)" />,
    title: 'Honest & Transparent',
    description: 'We believe in genuine Vedic wisdom, not fear-mongering or fake predictions. Pure clarity tailored to you.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className="font-serif thread-heading">
            <span>Why <em>Choose Us</em></span>
          </h2>
          <p className="font-sans">
            What sets Kundaliwaale apart from other astrology services.
          </p>
        </div>

        <div className={styles.grid}>
          {reasons.map((reason, i) => (
            <div key={i} className={`${styles.card} glass-card`}>
              <div className={styles.cardIcon}>
                {React.cloneElement(reason.icon, { size: 24 })}
              </div>
              <div className={styles.cardContent}>
                <h3 className="font-body">{reason.title}</h3>
                <p className="font-sans">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
