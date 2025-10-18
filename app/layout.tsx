import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | RadSystems',
    default: 'RadSystems Platform',
  },
  description: 'Multi-tenant education management platform powered by Supabase.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}>{children}</body>
    </html>
  );
}
