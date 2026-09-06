'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './modal.module.css';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';

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
  const { dict } = useLanguage();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
          name: formData.name || '',
          email: '', // could be added to formData
          contact: formData.phone || '',
        },
        theme: {
          color: '#ffce73',
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      paymentObject.on('payment.failed', function (response: any) {
        alert('Payment failed! ' + response.error.description);
      });

    } catch (err: unknown) {
      alert((err as Error).message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    onClose();
    router.push('/dashboard');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateField = (field: string, value: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const renderStep1Fields = () => {
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
          {tier !== 'quick' && (
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
          {tier === 'online' && (
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
          {tier === 'home-visit' && (
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
            <div className={`${styles.stepIndicator} ${step >= 1 ? styles.activeStep : ''}`}>{dict.booking_modal.steps.s1}</div>
            <div className={`${styles.stepIndicator} ${step >= 2 ? styles.activeStep : ''}`}>{dict.booking_modal.steps.s2}</div>
            <div className={`${styles.stepIndicator} ${step === 3 ? styles.activeStep : ''}`}>{dict.booking_modal.steps.s3}</div>
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
                  {dict.booking_modal.actions.continue_payment} <ArrowRight size={18} />
                </Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className={styles.paymentWrapper}>
              <div className={styles.summaryCard}>
                <h3 className="font-sans">{dict.booking_modal.summary.title}</h3>
                <div className={styles.summaryRow}>
                  <span>{serviceName}</span>
                  <span>₹{price}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>{dict.booking_modal.summary.taxes}</span>
                  <span>₹0</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>{dict.booking_modal.summary.total}</span>
                  <span>₹{price}</span>
                </div>
              </div>
              <div className={styles.footerRow}>
                <button type="button" className={styles.backBtn} onClick={() => setStep(1)}>
                  <ArrowLeft size={18} /> {dict.booking_modal.actions.back}
                </button>
                <Button variant="primary" onClick={handlePayment} disabled={loading} style={{ flex: 1 }}>
                  {loading ? dict.booking_modal.actions.processing : dict.booking_modal.actions.pay_now.replace('{{price}}', price.toString())}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
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
          )}
        </div>
      </div>
    </div>
  );
}
