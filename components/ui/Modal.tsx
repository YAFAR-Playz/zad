import { ReactNode } from 'react';
import { Button } from './Button';

interface ModalProps {
  title: string;
  description?: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  children: ReactNode;
}

export function Modal({ title, description, primaryAction, secondaryAction, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <header className="mb-4">
          <h3 className="text-lg font-semibold text-[#073B4C]">{title}</h3>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </header>
        <div className="space-y-4 text-sm text-slate-600">{children}</div>
        {(primaryAction || secondaryAction) && (
          <footer className="mt-6 flex justify-end gap-2">
            {secondaryAction && (
              <Button variant="ghost" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}
