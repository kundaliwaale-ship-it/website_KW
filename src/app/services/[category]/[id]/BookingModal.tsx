'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './modal.module.css';
import { createClient } from '@/utils/supabase/client';

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
      let finalFormData = { ...formData };
      
      if (category === 'vastu') {
        const supabase = createClient();
        
        if (formData.blueprint_pdf) {
          const file = formData.blueprint_pdf;
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const { error: uploadError, data } = await supabase.storage.from('vastu-blueprints').upload(fileName, file);
          
          if (!uploadError && data) {
            const { data: { publicUrl } } = supabase.storage.from('vastu-blueprints').getPublicUrl(fileName);
            finalFormData.blueprint_pdf_url = publicUrl;
          }
        }
        
        if (formData.house_images && formData.house_images.length > 0) {
          const imageUrls = [];
          for (let i = 0; i < formData.house_images.length; i++) {
            const file = formData.house_images[i];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { error: uploadError, data } = await supabase.storage.from('vastu-blueprints').upload(fileName, file);
            
            if (!uploadError && data) {
              const { data: { publicUrl } } = supabase.storage.from('vastu-blueprints').getPublicUrl(fileName);
              imageUrls.push(publicUrl);
            }
          }
          finalFormData.house_images_urls = imageUrls;
        }
      }

      delete finalFormData.blueprint_pdf;
      delete finalFormData.house_images;

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
          formData: finalFormData,
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

  const updateField = (field: string, value: any) => {
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
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Father's Name</label>
              <input type="text" required placeholder="Father's Full Name" onChange={(e) => updateField('fathers_name', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Mother's Name</label>
              <input type="text" required placeholder="Mother's Full Name" onChange={(e) => updateField('mothers_name', e.target.value)} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Grandfather's Name</label>
              <input type="text" required placeholder="Grandfather's Full Name" onChange={(e) => updateField('grandfathers_name', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Grandmother's Name</label>
              <input type="text" required placeholder="Grandmother's Full Name" onChange={(e) => updateField('grandmothers_name', e.target.value)} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Primary Phone</label>
              <input type="tel" required placeholder="+91 98765 00000" onChange={(e) => updateField('mobile_number_1', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Alternate Phone (Optional)</label>
              <input type="tel" placeholder="+91 98765 00000" onChange={(e) => updateField('mobile_number_2', e.target.value)} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Delivery Address</label>
            <textarea required rows={3} placeholder="Full Delivery Address" onChange={(e) => updateField('delivery_address', e.target.value)}></textarea>
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
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>State</label>
              <input type="text" required placeholder="E.g., Maharashtra" onChange={(e) => updateField('state', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>District</label>
              <input type="text" required placeholder="E.g., Mumbai" onChange={(e) => updateField('district', e.target.value)} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Town/City</label>
              <input type="text" required placeholder="E.g., Andheri" onChange={(e) => updateField('town', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input type="tel" required placeholder="+91 98765 00000" onChange={(e) => updateField('phone', e.target.value)} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Complete Property Address</label>
            <textarea required rows={3} placeholder="Enter full address..." onChange={(e) => updateField('address', e.target.value)}></textarea>
          </div>
          {tier === 'online' && (
            <>
              <div className={styles.formGroup}>
                <label>Upload Blueprint (PDF)</label>
                <input type="file" accept=".pdf" onChange={(e) => updateField('blueprint_pdf', e.target.files?.[0])} />
              </div>
              <div className={styles.formGroup}>
                <label>Upload House Images (JPG/PNG)</label>
                <input type="file" accept="image/*" multiple onChange={(e) => updateField('house_images', e.target.files)} />
              </div>
            </>
          )}
          {tier === 'home-visit' && (
            <div className={styles.formGroup}>
              <label>Approx. Distance from Varanasi (km) - Optional</label>
              <input type="number" placeholder="E.g., 250" onChange={(e) => updateField('distance', e.target.value)} />
            </div>
          )}
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
