import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface DashboardShellProps {
  title: string;
  children: ReactNode;
}

export function DashboardShell({ title, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Topbar title={title} />
          <div className="px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
