'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function BookingForm({ category, tier, price }: { category: string, tier: string, price: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determine actual price (Consultation is fixed 51 as per blueprint)
  const actualPrice = category === 'consultation' ? 51 : price;

  // Form States
  const [formData, setFormData] = useState<any>({
    // Shared
    fullName: '',
    mobile1: '',
    
    // Kundali Specific
    dob: '',
    tob: '',
    pob: '',
    fathersName: '',
    mothersName: '',
    grandfathersName: '',
    grandmothersName: '',
    mobile2: '',
    deliveryAddress: '',
    
    // Consultation Specific
    selectedTime: '',
    
    // Vastu Specific
    vastuType: 'home_visit', // home_visit | blueprint_analysis
    state: '',
    district: '',
    town: '',
    completeAddress: '',
  });

  const [blueprintPdf, setBlueprintPdf] = useState<File | null>(null);
  const [houseImages, setHouseImages] = useState<FileList | null>(null);

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleRazorpayPayment = async (orderData: any) => {
    // 1. Create order on server
    const res = await fetch('/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: actualPrice, category, tier, orderData })
    });
    const orderDetails = await res.json();
    
    if (!res.ok) throw new Error(orderDetails.error || 'Failed to initialize payment');

    // 2. Initialize Razorpay Modal
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY', 
      amount: orderDetails.amount,
      currency: "INR",
      name: "Kundaliwaale",
      description: `${category} - ${tier}`,
      order_id: orderDetails.id,
      handler: async function (response: any) {
        // 3. Verify Payment
        try {
          const verifyRes = await fetch('/api/payment/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              category,
              tier,
              amount: actualPrice,
              orderData
            })
          });
          
          if (!verifyRes.ok) throw new Error('Payment verification failed');
          
          alert('Order Placed Successfully!');
          router.push('/dashboard');
        } catch(err) {
          setError('Payment Verification failed. Please contact support.');
          setLoading(false);
        }
      },
      prefill: {
        name: formData.fullName,
        contact: formData.mobile1,
      },
      theme: {
        color: "#c29b57" // var(--color-gold)
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', function (response: any){
        setError(`Payment Failed: ${response.error.description}`);
        setLoading(false);
    });
    rzp.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // If Vastu Blueprint, upload files to Supabase Storage first
      let pdfUrl = '';
      let imageUrls: string[] = [];
      
      if (category === 'vastu' && formData.vastuType === 'blueprint_analysis') {
         // TODO: Upload files via supabase-js before payment, get URLs
         // (Implementation requires Supabase storage bucket setup)
      }

      await handleRazorpayPayment({ ...formData, pdfUrl, imageUrls });

    } catch (err: any) {
       setError(err.message || 'Something went wrong');
       setLoading(false);
    }
  };

  const renderKundaliFields = () => (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <label className="font-sans" style={labelStyle}>Full Name</label>
        <input type="text" required style={inputStyle} value={formData.fullName} onChange={e => updateField('fullName', e.target.value)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label className="font-sans" style={labelStyle}>Date of Birth</label>
          <input type="date" required style={inputStyle} value={formData.dob} onChange={e => updateField('dob', e.target.value)} />
        </div>
        <div>
          <label className="font-sans" style={labelStyle}>Time of Birth</label>
          <input type="time" required style={inputStyle} value={formData.tob} onChange={e => updateField('tob', e.target.value)} />
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label className="font-sans" style={labelStyle}>Place of Birth</label>
        <input type="text" required style={inputStyle} value={formData.pob} onChange={e => updateField('pob', e.target.value)} />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div><label className="font-sans" style={labelStyle}>Father's Name</label><input type="text" required style={inputStyle} value={formData.fathersName} onChange={e => updateField('fathersName', e.target.value)} /></div>
        <div><label className="font-sans" style={labelStyle}>Mother's Name</label><input type="text" required style={inputStyle} value={formData.mothersName} onChange={e => updateField('mothersName', e.target.value)} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div><label className="font-sans" style={labelStyle}>Grandfather's Name</label><input type="text" required style={inputStyle} value={formData.grandfathersName} onChange={e => updateField('grandfathersName', e.target.value)} /></div>
        <div><label className="font-sans" style={labelStyle}>Grandmother's Name</label><input type="text" required style={inputStyle} value={formData.grandmothersName} onChange={e => updateField('grandmothersName', e.target.value)} /></div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div><label className="font-sans" style={labelStyle}>Mobile Number 1</label><input type="tel" required style={inputStyle} value={formData.mobile1} onChange={e => updateField('mobile1', e.target.value)} /></div>
        <div><label className="font-sans" style={labelStyle}>Mobile Number 2</label><input type="tel" style={inputStyle} value={formData.mobile2} onChange={e => updateField('mobile2', e.target.value)} /></div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label className="font-sans" style={labelStyle}>Delivery Address</label>
        <textarea required rows={3} style={inputStyle} value={formData.deliveryAddress} onChange={e => updateField('deliveryAddress', e.target.value)}></textarea>
      </div>
    </>
  );

  const renderConsultationFields = () => (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <label className="font-sans" style={labelStyle}>Enter Name</label>
        <input type="text" required style={inputStyle} value={formData.fullName} onChange={e => updateField('fullName', e.target.value)} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label className="font-sans" style={labelStyle}>Mobile Number</label>
        <input type="tel" required style={inputStyle} value={formData.mobile1} onChange={e => updateField('mobile1', e.target.value)} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label className="font-sans" style={labelStyle}>Select Time / Date</label>
        <input type="datetime-local" required style={inputStyle} value={formData.selectedTime} onChange={e => updateField('selectedTime', e.target.value)} />
      </div>
    </>
  );

  const renderVastuFields = () => (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <label className="font-sans" style={labelStyle}>Service Type</label>
        <select style={inputStyle} value={formData.vastuType} onChange={e => updateField('vastuType', e.target.value)}>
          <option value="home_visit">Home Visit</option>
          <option value="blueprint_analysis">Blueprint Analysis</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label className="font-sans" style={labelStyle}>Full Name</label>
        <input type="text" required style={inputStyle} value={formData.fullName} onChange={e => updateField('fullName', e.target.value)} />
      </div>
      
      {formData.vastuType === 'home_visit' ? (
        <>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div><label className="font-sans" style={labelStyle}>State</label><input type="text" required style={inputStyle} value={formData.state} onChange={e => updateField('state', e.target.value)} /></div>
            <div><label className="font-sans" style={labelStyle}>District</label><input type="text" required style={inputStyle} value={formData.district} onChange={e => updateField('district', e.target.value)} /></div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="font-sans" style={labelStyle}>Town / City</label>
            <input type="text" required style={inputStyle} value={formData.town} onChange={e => updateField('town', e.target.value)} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="font-sans" style={labelStyle}>Complete Address</label>
            <textarea required rows={3} style={inputStyle} value={formData.completeAddress} onChange={e => updateField('completeAddress', e.target.value)}></textarea>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="font-sans" style={labelStyle}>Mobile Number</label>
            <input type="tel" required style={inputStyle} value={formData.mobile1} onChange={e => updateField('mobile1', e.target.value)} />
          </div>
        </>
      ) : (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <label className="font-sans" style={labelStyle}>Upload Blueprint (PDF)</label>
            <input type="file" accept=".pdf" required style={inputStyle} onChange={e => setBlueprintPdf(e.target.files?.[0] || null)} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="font-sans" style={labelStyle}>Upload House Images</label>
            <input type="file" multiple accept="image/*" required style={inputStyle} onChange={e => setHouseImages(e.target.files)} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="font-sans" style={labelStyle}>Mobile Number</label>
            <input type="tel" required style={inputStyle} value={formData.mobile1} onChange={e => updateField('mobile1', e.target.value)} />
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '4px' }}>{error}</div>}
        
        {category === 'kundali' && renderKundaliFields()}
        {category === 'consultation' && renderConsultationFields()}
        {category === 'vastu' && renderVastuFields()}

        <div style={{ marginTop: '2rem' }}>
          <Button variant="primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Processing...' : `Pay ₹${actualPrice}`}
          </Button>
        </div>
      </form>
    </>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  background: 'rgba(0,0,0,0.2)',
  border: '1px solid var(--border-gold)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--text-primary)',
  fontFamily: 'inherit'
};
const labelStyle = { display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' };
