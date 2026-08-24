import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './AboutAcharya.module.css';
import { GraduationCap, Book, Globe, Star, User } from 'lucide-react';

export default function AboutAcharya() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imageCol}>
          <div className={styles.imagePlaceholder}>
            <img 
              src="/images/acharya_portrait.png" 
              alt="Acharya Ji" 
              className={styles.portraitImg}
            />
          </div>
          <div className={styles.experienceBadge}>
            <h4 className="font-body">100%</h4>
            <p className="font-sans">Handwritten</p>
          </div>
        </div>

        <div className={styles.manuscriptBox}>
          <div className={styles.content}>
          <h2 className="font-serif">
            About <em>Kundaliwaale</em>
          </h2>
          <p className="font-sans">
            Now, you can have the finest authentic Handwritten Kundlis prepared with sacred Vedic precision and delivered directly to your doorstep. We combine ancient mathematical Jyotish principles with dedicated personal care — delivering pure, unadulterated astrological clarity to your home without computer-generated shortcuts or false promises.
          </p>

          <div className={styles.credentials}>
            <div className={styles.credential}>
              <GraduationCap size={20} />
              <span className="font-sans">Jyotish Acharya Certified</span>
            </div>
            <div className={styles.credential}>
              <Book size={20} />
              <span className="font-sans">Sacred Vedic Manuscripts</span>
            </div>
            <div className={styles.credential}>
              <Globe size={20} />
              <span className="font-sans">Pan-India Home Delivery</span>
            </div>
            <div className={styles.credential}>
              <Star size={20} />
              <span className="font-sans">100% Personalized & Handcrafted</span>
            </div>
          </div>

          <Link href="/about" className={`${styles.readMore} font-sans`}>
            Read Full Bio <span>→</span>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
