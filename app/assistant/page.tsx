import { DashboardShell } from '@/components/ui/DashboardShell';
import { DataTable } from '@/components/ui/DataTable';

const students = [
  { name: 'Amina H.', status: 'Active', lastReport: 'Sep 2025' },
  { name: 'Ziad M.', status: 'Active', lastReport: 'Oct 2025' },
  { name: 'Farah L.', status: 'Pending', lastReport: '—' },
];

export default function AssistantPage() {
  return (
    <DashboardShell title="Assistant student list">
      <DataTable
        columns={[
          { key: 'name', header: 'Student' },
          { key: 'status', header: 'Status' },
          { key: 'lastReport', header: 'Last report' },
        ]}
        data={students}
        emptyState="Import students to begin tracking progress."
      />
    </DashboardShell>
  );
}
