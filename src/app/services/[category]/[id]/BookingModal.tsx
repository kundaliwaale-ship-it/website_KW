'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './modal.module.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  tier: string;
  price: number;
  serviceName: string;
}

export default function BookingModal({ isOpen, onClose, category, tier, price, serviceName }: BookingModalProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setFormData({});
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: price,
          receipt: `rcpt_${Math.floor(Math.random() * 10000)}`,
          category,
          tier,
          formData,
        }),
      });

      const order = await res.json();
      
      if (!res.ok) {
        throw new Error(order.error || 'Failed to create order');
      }

      const resScript = await loadRazorpayScript();
      if (!resScript) {
        alert('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '', // Needs to be set in env
        amount: order.amount,
        currency: order.currency,
        name: 'Kundaliwaale',
        description: serviceName,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                category,
                dbOrderId: order.dbOrderId
              })
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setStep(3); // Success Step
            } else {
              alert('Payment verification failed: ' + verifyData.error);
            }
          } catch (err) {
            alert('Payment verification error.');
          }
        },
        prefill: {
          name: formData.name || '',
          email: '', // could be added to formData
          contact: formData.phone || '',
        },
        theme: {
          color: '#ffce73',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', function (response: any) {
        alert('Payment failed! ' + response.error.description);
      });

    } catch (err: any) {
      alert(err.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    onClose();
    router.push('/dashboard');
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const renderStep1Fields = () => {
    if (category === 'kundali') {
      return (
        <>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input type="text" required placeholder="John Doe" onChange={(e) => updateField('name', e.target.value)} />
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Date of Birth</label>
              <input type="date" required onChange={(e) => updateField('dob', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Time of Birth</label>
              <input type="time" required onChange={(e) => updateField('tob', e.target.value)} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Place of Birth</label>
            <input type="text" required placeholder="City, State, Country" onChange={(e) => updateField('pob', e.target.value)} />
          </div>
        </>
      );
    }
    
    if (category === 'consultation') {
      return (
        <>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input type="text" required placeholder="John Doe" onChange={(e) => updateField('name', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Phone Number (WhatsApp)</label>
            <input type="tel" required placeholder="+91 98765 00000" onChange={(e) => updateField('phone', e.target.value)} />
          </div>
          {tier !== 'quick' && (
            <div className={styles.formGroup}>
              <label>Preferred Date</label>
              <input type="date" required onChange={(e) => updateField('date', e.target.value)} />
            </div>
          )}
          <div className={styles.formGroup}>
            <label>Topic of Concern</label>
            <select required onChange={(e) => updateField('topic', e.target.value)}>
              <option value="">Select a topic...</option>
              <option value="career">Career & Wealth</option>
              <option value="love">Love & Marriage</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
          </div>
        </>
      );
    }

    if (category === 'vastu') {
      return (
        <>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input type="text" required placeholder="John Doe" onChange={(e) => updateField('name', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Property Type</label>
            <select required onChange={(e) => updateField('property', e.target.value)}>
              <option value="">Select type...</option>
              <option value="home">Residential / Home</option>
              <option value="office">Commercial / Office</option>
              <option value="factory">Factory / Industrial</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Property Address</label>
            <textarea required rows={3} placeholder="Enter full address..." onChange={(e) => updateField('address', e.target.value)}></textarea>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        {/* Step Indicator */}
        <div className={styles.header}>
          <h2 className="font-serif">{serviceName}</h2>
          <div className={styles.steps}>
            <div className={`${styles.stepIndicator} ${step >= 1 ? styles.activeStep : ''}`}>1. Details</div>
            <div className={`${styles.stepIndicator} ${step >= 2 ? styles.activeStep : ''}`}>2. Payment</div>
            <div className={`${styles.stepIndicator} ${step === 3 ? styles.activeStep : ''}`}>3. Confirm</div>
          </div>
        </div>

        <div className={styles.body}>
          {step === 1 && (
            <form onSubmit={handleNext}>
              <div className={styles.formWrapper}>
                {renderStep1Fields()}
              </div>
              <div className={styles.footer}>
                <Button variant="primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  Continue to Payment <ArrowRight size={18} />
                </Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className={styles.paymentWrapper}>
              <div className={styles.summaryCard}>
                <h3 className="font-sans">Order Summary</h3>
                <div className={styles.summaryRow}>
                  <span>{serviceName}</span>
                  <span>₹{price}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Taxes & Fees</span>
                  <span>₹0</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Total Amount</span>
                  <span>₹{price}</span>
                </div>
              </div>
              <div className={styles.footerRow}>
                <button type="button" className={styles.backBtn} onClick={() => setStep(1)}>
                  <ArrowLeft size={18} /> Back
                </button>
                <Button variant="primary" onClick={handlePayment} disabled={loading} style={{ flex: 1 }}>
                  {loading ? 'Processing...' : `Pay ₹${price} Now`}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.successWrapper}>
              <div className={styles.successIcon}>
                <CheckCircle size={64} />
              </div>
              <h3 className="font-serif">Booking Confirmed!</h3>
              <p className="font-sans">Your order has been placed successfully. You will receive an email confirmation shortly.</p>
              <Button variant="primary" onClick={handleFinish} style={{ marginTop: '2rem' }}>
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
