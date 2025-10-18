'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BrandBanner } from '@/components/ui/BrandBanner';

export default function RegisterPage() {
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-100 via-white to-teal-50 flex flex-col items-center justify-center p-6">
      <BrandBanner subtitle="Create a new RadSystems organization" />
      <form className="w-full max-w-2xl space-y-6 rounded-xl bg-white p-10 shadow-lg">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="orgName"
            label="Organization Name"
            value={orgName}
            onChange={(event) => setOrgName(event.target.value)}
            required
          />
          <Input
            id="email"
            label="Work Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          required
        />
        <Button type="submit" className="w-full sm:w-auto">
          Create organization
        </Button>
        <p className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#073B4C] hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
