'use server'

import { createClient } from '@/utils/supabase/server'

export async function submitContactInquiry(formData: FormData) {
  const supabase = await createClient()

  const data = {
    full_name: formData.get('fullName') as string,
    email_address: formData.get('email') as string,
    phone_number: formData.get('phone') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  }

  const { error } = await supabase.from('contact_inquiries').insert([data])

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
