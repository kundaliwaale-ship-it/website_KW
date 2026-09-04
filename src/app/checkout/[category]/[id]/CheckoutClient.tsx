'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './checkout.module.css';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';

interface CheckoutClientProps {
  category: string;
  tier: { id: string; name: string; price: number; originalPrice?: number; description: string };
}

export default function CheckoutClient({ category, tier }: CheckoutClientProps) {
  const router = useRouter();
  const { dict } = useLanguage();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});
  
  // Ensure we are at the top of the page when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    handlePayment();
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
      const finalFormData = { ...formData };
      
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
          amount: tier.price,
          receipt: `rcpt_${Math.floor(Math.random() * 10000)}`,
          category,
          tier: tier.id,
          formData: finalFormData,
        }),
      });

      const order = await res.json();
      
      if (!res.ok) {
        throw new Error(order.error || 'Failed to create order. Make sure you are logged in.');
      }

      const resScript = await loadRazorpayScript();
      if (!resScript) {
        alert('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: order.amount,
        currency: order.currency,
        name: 'Kundaliwaale',
        description: tier.name,
        order_id: order.id,
        handler: async function (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
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
          name: formData.name || formData.name || '',
          email: '', 
          contact: formData.phone || formData.mobile_number_1 || '',
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
    router.push('/dashboard');
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const renderFormFields = () => {
    if (category === 'kundali') {
      return (
        <>
          <div className={styles.formGroup}>
            <label>{dict.booking_modal.form.name_label}</label>
            <input type="text" required placeholder={dict.booking_modal.form.name_ph} onChange={(e) => updateField('name', e.target.value)} />
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.dob_label}</label>
              <input type="date" required onChange={(e) => updateField('dob', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.tob_label}</label>
              <input type="time" required onChange={(e) => updateField('tob', e.target.value)} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>{dict.booking_modal.form.pob_label}</label>
            <input type="text" required placeholder={dict.booking_modal.form.pob_ph} onChange={(e) => updateField('pob', e.target.value)} />
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.father_label}</label>
              <input type="text" required placeholder={dict.booking_modal.form.father_ph} onChange={(e) => updateField('fathers_name', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.mother_label}</label>
              <input type="text" required placeholder={dict.booking_modal.form.mother_ph} onChange={(e) => updateField('mothers_name', e.target.value)} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.gfather_label}</label>
              <input type="text" required placeholder={dict.booking_modal.form.gfather_ph} onChange={(e) => updateField('grandfathers_name', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.gmother_label}</label>
              <input type="text" required placeholder={dict.booking_modal.form.gmother_ph} onChange={(e) => updateField('grandmothers_name', e.target.value)} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.phone1_label}</label>
              <input type="tel" required placeholder={dict.booking_modal.form.phone1_ph} onChange={(e) => updateField('mobile_number_1', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.phone2_label}</label>
              <input type="tel" placeholder={dict.booking_modal.form.phone2_ph} onChange={(e) => updateField('mobile_number_2', e.target.value)} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>{dict.booking_modal.form.address_label}</label>
            <textarea required rows={3} placeholder={dict.booking_modal.form.address_ph} onChange={(e) => updateField('delivery_address', e.target.value)}></textarea>
          </div>
        </>
      );
    }
    
    if (category === 'consultation') {
      return (
        <>
          <div className={styles.formGroup}>
            <label>{dict.booking_modal.form.name_label}</label>
            <input type="text" required placeholder={dict.booking_modal.form.name_ph} onChange={(e) => updateField('name', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>{dict.booking_modal.form.whatsapp_label}</label>
            <input type="tel" required placeholder={dict.booking_modal.form.phone1_ph} onChange={(e) => updateField('phone', e.target.value)} />
          </div>
          {tier.id !== 'quick' && (
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.date_label}</label>
              <input type="date" required onChange={(e) => updateField('date', e.target.value)} />
            </div>
          )}
          <div className={styles.formGroup}>
            <label>{dict.booking_modal.form.topic_label}</label>
            <select required onChange={(e) => updateField('topic', e.target.value)}>
              <option value="">{dict.booking_modal.form.topic_select}</option>
              <option value="career">{dict.booking_modal.form.topic_career}</option>
              <option value="love">{dict.booking_modal.form.topic_love}</option>
              <option value="health">{dict.booking_modal.form.topic_health}</option>
              <option value="other">{dict.booking_modal.form.topic_other}</option>
            </select>
          </div>
        </>
      );
    }

    if (category === 'vastu') {
      return (
        <>
          <div className={styles.formGroup}>
            <label>{dict.booking_modal.form.name_label}</label>
            <input type="text" required placeholder={dict.booking_modal.form.name_ph} onChange={(e) => updateField('name', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>{dict.booking_modal.form.prop_label}</label>
            <select required onChange={(e) => updateField('property', e.target.value)}>
              <option value="">{dict.booking_modal.form.prop_select}</option>
              <option value="home">{dict.booking_modal.form.prop_home}</option>
              <option value="office">{dict.booking_modal.form.prop_office}</option>
              <option value="factory">{dict.booking_modal.form.prop_factory}</option>
            </select>
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.state_label}</label>
              <input type="text" required placeholder={dict.booking_modal.form.state_ph} onChange={(e) => updateField('state', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.dist_label}</label>
              <input type="text" required placeholder={dict.booking_modal.form.dist_ph} onChange={(e) => updateField('district', e.target.value)} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.town_label}</label>
              <input type="text" required placeholder={dict.booking_modal.form.town_ph} onChange={(e) => updateField('town', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.phone1_label}</label>
              <input type="tel" required placeholder={dict.booking_modal.form.phone1_ph} onChange={(e) => updateField('phone', e.target.value)} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>{dict.booking_modal.form.full_address_label}</label>
            <textarea required rows={3} placeholder={dict.booking_modal.form.full_address_ph} onChange={(e) => updateField('address', e.target.value)}></textarea>
          </div>
          {tier.id === 'online' && (
            <>
              <div className={styles.formGroup}>
                <label>{dict.booking_modal.form.upload_bp_label}</label>
                <input type="file" accept=".pdf" onChange={(e) => updateField('blueprint_pdf', e.target.files?.[0])} />
              </div>
              <div className={styles.formGroup}>
                <label>{dict.booking_modal.form.upload_img_label}</label>
                <input type="file" accept="image/*" multiple onChange={(e) => updateField('house_images', e.target.files)} />
              </div>
            </>
          )}
          {tier.id === 'home-visit' && (
            <div className={styles.formGroup}>
              <label>{dict.booking_modal.form.dist_km_label}</label>
              <input type="number" placeholder={dict.booking_modal.form.dist_km_ph} onChange={(e) => updateField('distance', e.target.value)} />
            </div>
          )}
        </>
      );
    }
    return null;
  };

  if (step === 3) {
    return (
      <div className={styles.checkoutPage}>
        <div className={styles.checkoutContainer} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={styles.formCard} style={{ maxWidth: '600px', width: '100%' }}>
            <div className={styles.successWrapper}>
              <div className={styles.successIcon}>
                <CheckCircle size={64} />
              </div>
              <h3 className="font-serif">{dict.booking_modal.success.title}</h3>
              <p className="font-sans">{dict.booking_modal.success.desc}</p>
              <Button variant="primary" onClick={handleFinish} style={{ marginTop: '2rem' }}>
                {dict.booking_modal.actions.go_dashboard}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.checkoutContainer}>
        {/* Left Column - Form */}
        <div className={styles.leftColumn}>
          <div className={styles.stepHeader}>
            <h1 className="font-serif">Complete your booking</h1>
            <div className={styles.steps}>
              <div className={`${styles.stepIndicator} ${step >= 1 ? styles.activeStep : ''}`}>1. Details</div>
              <div className={`${styles.stepIndicator} ${step >= 2 ? styles.activeStep : ''}`}>2. Payment</div>
            </div>
          </div>

          <form className={styles.formCard} onSubmit={handleNext}>
            {renderFormFields()}
            <div className={styles.formActions}>
              <Button variant="primary" type="submit" disabled={loading} style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                 {loading ? 'Processing...' : `Proceed to Pay ₹${tier.price}`} <ArrowRight size={18} />
              </Button>
            </div>
            <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} color="var(--accent-green)" /> Secure Checkout via Razorpay
            </div>
          </form>
        </div>

        {/* Right Column - Summary */}
        <div className={styles.rightColumn}>
          <div className={styles.summaryCard}>
            <h3 className="font-serif">Order Summary</h3>
            <div className={styles.summaryRow}>
              <span>{tier.name}</span>
              <span>₹{tier.price}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Taxes & Fees</span>
              <span>₹0</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total Amount</span>
              <span>₹{tier.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
