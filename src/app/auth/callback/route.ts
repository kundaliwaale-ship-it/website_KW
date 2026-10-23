import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
    console.error('Auth code exchange error:', error.message)
  }

  // If code exchange fails or is missing, redirect to appropriate page with error message
  const fallback = next.includes('reset-password')
    ? `${origin}/forgot-password?error=Invalid+or+expired+reset+link`
    : `${origin}/login?error=Could+not+authenticate`
  return NextResponse.redirect(fallback)
}
