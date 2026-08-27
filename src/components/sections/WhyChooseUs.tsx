import React from 'react';
import { Home, PenTool, Award, ShieldCheck } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const reasons = [
  {
    icon: <Home />,
    number: '01',
    title: 'Delivered to Your Home',
    description: 'Authentic, personally handwritten Janam Kundlis safely packaged and delivered directly to your doorstep.',
  },
  {
    icon: <PenTool />,
    number: '02',
    title: '100% Handwritten Quality',
    description: 'Every Kundli is meticulously written by hand using traditional calculations — never automated generic PDFs.',
  },
  {
    icon: <Award />,
    number: '03',
    title: 'Certified Jyotish Acharyas',
    description: 'Prepared with deep scriptural authority and exact mathematical precision by recognized Jyotish scholars.',
  },
  {
    icon: <ShieldCheck />,
    number: '04',
    title: 'Honest & Transparent',
    description: 'Genuine Vedic wisdom, not fear-mongering or fake predictions. Pure clarity tailored to you.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={`${styles.label} font-sans`}>Why Us</span>
          <h2 className="font-serif">
            What Makes Us <em>Different</em>
          </h2>
        </div>

        <div className={styles.grid}>
          {reasons.map((reason, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={`${styles.number} font-serif`}>{reason.number}</span>
                <div className={styles.cardIcon}>
                  {React.cloneElement(reason.icon, { size: 22, strokeWidth: 1.5 })}
                </div>
              </div>
              <h3 className="font-serif">{reason.title}</h3>
              <p className="font-sans">{reason.description}</p>
              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
