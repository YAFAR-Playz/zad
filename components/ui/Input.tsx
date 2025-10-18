import { ComponentProps } from 'react';
import clsx from 'clsx';

export type InputProps = ComponentProps<'input'> & {
  label?: string;
};

export function Input({ id, label, className, ...props }: InputProps) {
  return (
    <label className="block text-sm font-medium text-slate-700" htmlFor={id}>
      {label && <span className="mb-1 block">{label}</span>}
      <input
        id={id}
        className={clsx(
          'w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-[#073B4C] focus:outline-none focus:ring-2 focus:ring-[#A9D8C7]',
          className
        )}
        {...props}
      />
    </label>
  );
}
