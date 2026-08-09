import React from 'react';
import Link from 'next/link';
import styles from './CallToAction.module.css';
import Button from '@/components/ui/Button';

export default function CallToAction() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className="font-serif">
          Ready to Unlock Your <em>Destiny</em>?
        </h2>
        <p className="font-sans">
          Take the first step towards a life of clarity and purpose.
          Book your consultation or order your handwritten Kundli today.
        </p>
        <div className={styles.ctas}>
          <Link href="/services/kundali">
            <Button variant="primary">Order Handwritten Kundli →</Button>
          </Link>
          <Link href="/services/consultation">
            <Button variant="outline">Book Consultation</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
