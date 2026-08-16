-- Create Profiles Table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone_number TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Create Kundali Orders Table
CREATE TABLE kundali_orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  kundali_type TEXT NOT NULL, -- 'detailed' or 'short'
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'Pending Payment',
  
  -- Required Fields from Form
  full_name TEXT NOT NULL,
  dob DATE NOT NULL,
  tob TIME NOT NULL,
  pob TEXT NOT NULL,
  fathers_name TEXT NOT NULL,
  mothers_name TEXT NOT NULL,
  grandfathers_name TEXT NOT NULL,
  grandmothers_name TEXT NOT NULL,
  mobile_number_1 TEXT NOT NULL,
  mobile_number_2 TEXT,
  delivery_address TEXT NOT NULL,
  
  -- Payment Info
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE kundali_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own kundali orders" ON kundali_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own kundali orders" ON kundali_orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create Consultation Orders Table
CREATE TABLE consultation_orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  selected_time TIMESTAMP WITH TIME ZONE NOT NULL,
  amount NUMERIC DEFAULT 51,
  status TEXT DEFAULT 'Pending Payment',
  
  -- Payment Info
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE consultation_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own consultations" ON consultation_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own consultations" ON consultation_orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create Vastu Orders Table
CREATE TABLE vastu_orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  vastu_type TEXT NOT NULL, -- 'home_visit' or 'blueprint_analysis'
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'Pending Payment',
  
  -- Home Visit Fields
  state TEXT,
  district TEXT,
  town TEXT,
  complete_address TEXT,
  mobile_number TEXT,
  distance_calculated NUMERIC,
  scheduled_visit_date TIMESTAMP WITH TIME ZONE,
  
  -- Blueprint Analysis Fields
  blueprint_pdf_url TEXT,
  house_images_urls TEXT[], -- Array of image URLs
  
  -- Payment Info
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE vastu_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own vastu orders" ON vastu_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own vastu orders" ON vastu_orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create Contact Inquiries Table
CREATE TABLE contact_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email_address TEXT NOT NULL,
  phone_number TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'Unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert contact inquiries" ON contact_inquiries FOR INSERT WITH CHECK (true);
-- Only admins should read contact inquiries (handled by separate admin policy later)
