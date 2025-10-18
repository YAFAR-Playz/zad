import { ComponentProps } from 'react';
import clsx from 'clsx';

const baseClasses =
  'inline-flex items-center justify-center rounded-lg border border-transparent bg-[#CF441E] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#a93617] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073B4C] disabled:cursor-not-allowed disabled:opacity-60';

export type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const variantClasses = {
    primary: baseClasses,
    secondary:
      'inline-flex items-center justify-center rounded-lg border border-[#073B4C] bg-white px-4 py-2 text-sm font-semibold text-[#073B4C] shadow-sm transition hover:bg-[#073B4C] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073B4C] disabled:cursor-not-allowed disabled:opacity-60',
    ghost:
      'inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-[#073B4C] hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073B4C] disabled:cursor-not-allowed disabled:opacity-60',
  };

  return <button className={clsx(variantClasses[variant], className)} {...props} />;
}
