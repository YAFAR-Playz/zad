import Image from 'next/image';
import { Suspense } from 'react';

interface BrandBannerProps {
  subtitle?: string;
}

export function BrandBanner({ subtitle }: BrandBannerProps) {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <div className="mb-4 h-16 w-16 rounded-full bg-[#073B4C] p-3 shadow-lg">
        <Suspense fallback={<div className="h-full w-full rounded-full bg-teal-100" />}> 
          <Image src="/logo.svg" alt="RadSystems" width={48} height={48} className="h-full w-full object-contain" />
        </Suspense>
      </div>
      <h1 className="text-2xl font-semibold text-[#073B4C]">RadSystems</h1>
      {subtitle && <p className="mt-1 max-w-md text-sm text-slate-600">{subtitle}</p>}
    </div>
  );
}
