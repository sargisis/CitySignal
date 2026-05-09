'use client';
import { usePathname } from 'next/navigation';
import { LocaleProvider } from '@/hooks/useLocale';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExplore = pathname === '/explore';

  return (
    <LocaleProvider>
      <Header />
      <main style={{ paddingTop: 64, minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
      {!isExplore && <Footer />}
    </LocaleProvider>
  );
}

