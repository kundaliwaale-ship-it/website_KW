import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      category,
      dbOrderId
    } = body

    const secret = process.env.RAZORPAY_KEY_SECRET!

    // Verify signature
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex')

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid Payment Signature' }, { status: 400 })
    }

    const supabase = await createClient()
    
    // Update order status in DB
    const updateData = {
      status: 'Paid',
      razorpay_payment_id,
      razorpay_signature,
    }

    let tableName = ''
    if (category === 'kundali') tableName = 'kundali_orders'
    else if (category === 'consultation') tableName = 'consultation_orders'
    else if (category === 'vastu') tableName = 'vastu_orders'

    if (tableName) {
      const { error } = await supabase
        .from(tableName)
        .update(updateData)
        .eq('id', dbOrderId)

      if (error) {
        console.error('Failed to update order status:', error)
        // Note: Payment succeeded, but DB update failed. We should log this carefully.
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Verification Error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
