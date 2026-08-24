import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'dummy_id',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
    })

    const supabase = await createClient()
    
    // Ensure user is logged in
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please login first.' }, { status: 401 })
    }

    const body = await request.json()
    const { amount, receipt, category, tier, formData } = body

    // 1. Create Razorpay Order
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: 'INR',
      receipt,
    }
    const rzpOrder = await razorpay.orders.create(options)

    // 2. Save order in Supabase
    let dbError = null
    let dbOrderId = null

    if (category === 'kundali') {
      const { data, error } = await supabase.from('kundali_orders').insert([{
        user_id: user.id,
        kundali_type: tier,
        amount,
        full_name: formData.name,
        dob: formData.dob,
        tob: formData.tob,
        pob: formData.pob,
        fathers_name: formData.fathers_name || 'N/A',
        mothers_name: formData.mothers_name || 'N/A',
        grandfathers_name: formData.grandfathers_name || 'N/A',
        grandmothers_name: formData.grandmothers_name || 'N/A',
        mobile_number_1: formData.mobile_number_1 || formData.phone || 'N/A',
        mobile_number_2: formData.mobile_number_2 || null,
        delivery_address: formData.delivery_address || 'N/A',
        razorpay_order_id: rzpOrder.id
      }]).select()
      dbError = error
      dbOrderId = data?.[0]?.id
    } else if (category === 'consultation') {
      const { data, error } = await supabase.from('consultation_orders').insert([{
        user_id: user.id,
        name: formData.name,
        mobile_number: formData.phone,
        selected_time: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
        amount,
        razorpay_order_id: rzpOrder.id
      }]).select()
      dbError = error
      dbOrderId = data?.[0]?.id
    } else if (category === 'vastu') {
      const { data, error } = await supabase.from('vastu_orders').insert([{
        user_id: user.id,
        vastu_type: tier,
        amount,
        complete_address: formData.address,
        mobile_number: formData.phone,
        state: formData.state,
        district: formData.district,
        town: formData.town,
        distance_calculated: formData.distance ? parseFloat(formData.distance) : null,
        blueprint_pdf: formData.blueprint_pdf_url || null,
        house_images: formData.house_images_urls || null,
        razorpay_order_id: rzpOrder.id
      }]).select()
      dbError = error
      dbOrderId = data?.[0]?.id
    }

    if (dbError) {
      console.error('DB Insert Error:', dbError)
      return NextResponse.json({ error: 'Failed to save order details.' }, { status: 500 })
    }

    return NextResponse.json({
      id: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      dbOrderId,
    })
  } catch (error: any) {
    console.error('Razorpay Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
