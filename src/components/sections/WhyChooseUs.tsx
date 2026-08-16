import React from 'react';
import { Target, FileText, PenTool, ShieldCheck } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const reasons = [
  {
    icon: <Target size={32} color="var(--color-gold)" />,
    title: '15+ Years Experience',
    description: 'Over a decade of dedicated practice in Vedic astrology and Vastu Shastra.',
  },
  {
    icon: <FileText size={32} color="var(--color-gold)" />,
    title: 'Certified Expert',
    description: 'Recognized certifications from prestigious Jyotish institutions across India.',
  },
  {
    icon: <PenTool size={32} color="var(--color-gold)" />,
    title: 'Handwritten Reports',
    description: 'Every premium Kundli is personally handwritten by Kundaliwaale — not computer-generated.',
  },
  {
    icon: <ShieldCheck size={32} color="var(--color-gold)" />,
    title: 'Honest & Transparent',
    description: 'We do not believe in fake predictions. Expect only genuine, practical, and trustworthy guidance tailored to you.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className="font-serif thread-heading">
            Why <em>Choose Us</em>
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
