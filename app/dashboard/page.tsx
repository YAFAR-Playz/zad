import { Metadata } from 'next';
import { DashboardShell } from '@/components/ui/DashboardShell';
import { SummaryGrid } from '@/components/ui/SummaryGrid';
import { AssistantChat } from '@/components/ui/AssistantChat';

export const metadata: Metadata = {
  title: 'RadSystems Dashboard',
};

export default function DashboardPage() {
  return (
    <DashboardShell title="Welcome back">
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SummaryGrid
            items={[
              { label: 'Active Assistants', value: '24', trend: '+3 vs last week' },
              { label: 'Students', value: '420', trend: '+18 new' },
              { label: 'Pending Reports', value: '12', trend: 'Requires review' },
            ]}
          />
        </div>
        <AssistantChat />
      </div>
    </DashboardShell>
  );
}
