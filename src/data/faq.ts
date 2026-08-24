export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'kundali' | 'vastu' | 'consultation' | 'payment' | 'delivery';
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'Who is Kundaliwaale?',
    answer: 'Kundaliwaale is dedicated to bringing authentic, handwritten Janam Kundlis and genuine Vedic astrology directly to your home. Our certified Jyotish Acharyas prepare every chart with traditional calculations and personal attention, ensuring you receive honest, actionable guidance without automated shortcuts.',
    category: 'general',
  },
  {
    id: 2,
    question: 'What is a Janam Kundli?',
    answer: 'A Janam Kundli (birth chart) is a detailed astrological chart prepared based on the exact date, time, and place of your birth. It maps the positions of planets at the moment of your birth and is used to predict life events, career prospects, relationships, and health.',
    category: 'kundali',
  },
  {
    id: 3,
    question: 'What is the difference between the Premium and Digital Kundli?',
    answer: 'The Premium Kundli is handwritten by Kundaliwaale personally, includes 20+ years of Dasha analysis, and is delivered physically via courier. The Digital Kundli is a computer-generated report reviewed by our experts, covering 5 years of insights, and delivered instantly as a PDF via email.',
    category: 'kundali',
  },
  {
    id: 4,
    question: 'How long does it take to receive my Premium Kundli?',
    answer: 'The Premium Handwritten Kundli typically takes 7-10 business days to prepare and 3-5 additional days for delivery. You will receive WhatsApp updates at every stage — from preparation to shipping to delivery.',
    category: 'delivery',
  },
  {
    id: 5,
    question: 'What information do I need to provide for my Kundli?',
    answer: 'You need to provide your full name, date of birth, exact time of birth, and place of birth. The more accurate your birth time, the more precise your Kundli analysis will be.',
    category: 'kundali',
  },
  {
    id: 6,
    question: 'How does online Vastu Consultation work?',
    answer: 'For the online consultation, you upload your home or office blueprint/floor plan along with photos. Our Vastu expert analyzes the layout, identifies issues, and provides a detailed report with room-by-room corrections and remedies, delivered via email.',
    category: 'vastu',
  },
  {
    id: 7,
    question: 'What is the ₹51 Quick Consultation?',
    answer: 'The ₹51 Quick Consultation is an introductory offer where you pay ₹51 and our trained Purohit calls you back within 24 hours for a 15-minute phone consultation. You can ask one focused question and receive basic guidance and a remedy.',
    category: 'consultation',
  },
  {
    id: 8,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods through Razorpay including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, Rupay), Net Banking, and digital wallets.',
    category: 'payment',
  },
  {
    id: 9,
    question: 'Can I track my Kundli order?',
    answer: 'Yes! Once your Premium Kundli order is placed, you will receive a unique order ID. You can track the status (Pending → In Progress → Shipped → Delivered) through our website and will also receive updates via WhatsApp and SMS.',
    category: 'delivery',
  },
  {
    id: 10,
    question: 'Is home visit available in all cities?',
    answer: 'Home visits are available in selected cities. The pricing includes a base consultation fee plus a distance-based travel charge. Enter your address during booking to get an instant quote for your location.',
    category: 'vastu',
  },
  {
    id: 11,
    question: 'What is the refund policy?',
    answer: 'Digital reports and completed consultations are non-refundable. For Premium Kundli orders, you can cancel before the preparation begins for a full refund. If preparation has started, a 50% refund will be issued.',
    category: 'payment',
  },
  {
    id: 12,
    question: 'How do I book a Standard Consultation?',
    answer: 'Visit our Consultation page, select "Standard Consultation", choose an available date and time slot from the calendar, fill in your personal details, and complete the payment. You will receive a confirmation via email and WhatsApp.',
    category: 'consultation',
  },
];
