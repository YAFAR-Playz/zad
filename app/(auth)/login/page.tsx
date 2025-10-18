'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BrandBanner } from '@/components/ui/BrandBanner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-100 via-white to-teal-50 flex flex-col items-center justify-center p-6">
      <BrandBanner subtitle="Access your RadSystems workspace" />
      <form className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
        <div className="text-center text-sm text-slate-500">
          <Link
            href="/register"
            className="font-semibold text-[#CF441E] hover:text-[#a93617] hover:underline"
          >
            Need an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}
