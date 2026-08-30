'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    role: formData.get('role') as string || 'user',
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error || !authData.user) {
    return { error: error?.message || 'Login failed' }
  }

  revalidatePath('/', 'layout')
  return { redirectTo: '/dashboard' }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Create an admin client bypassing RLS and Email constraints
  const adminAuthClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    fullName: formData.get('fullName') as string,
    phone: formData.get('phone') as string,
  }


  // Use Admin API to create user with email_confirm: true
  const { data: authData, error: signUpError } = await adminAuthClient.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      full_name: data.fullName,
      phone_number: data.phone,
    }
  })

  if (signUpError || !authData.user) {
    return { error: signUpError?.message || 'Failed to create user' }
  }

  // Insert into profiles table since we bypass trigger
  await adminAuthClient.from('profiles').insert({
    id: authData.user.id,
    full_name: data.fullName,
    phone_number: data.phone,
  })

  // Log the user in to establish the session cookies for the client
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (signInError) {
    return { error: signInError.message }
  }

  revalidatePath('/', 'layout')
  return { redirectTo: '/dashboard' }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
