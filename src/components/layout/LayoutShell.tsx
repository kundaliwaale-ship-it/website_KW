'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/i18n/LanguageContext';

const AUTH_ROUTES = ['/login', '/register'];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.includes(pathname);
  const isDashboard = pathname.startsWith('/dashboard');
  const isCheckout = pathname.startsWith('/checkout');

  return (
    <LanguageProvider>
      {!isAuthPage && <Navbar />}
      <main>{children}</main>
      {!isAuthPage && !isDashboard && !isCheckout && <Footer />}
    </LanguageProvider>
  );
}
