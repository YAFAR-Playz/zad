import { Button } from './Button';

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white/70 px-6 py-4 backdrop-blur">
      <div>
        <h2 className="text-xl font-semibold text-[#073B4C]">{title}</h2>
        <p className="text-sm text-slate-500">Empower assistants, delight parents.</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost">Support</Button>
        <Button variant="secondary">Switch organization</Button>
      </div>
    </header>
  );
}
