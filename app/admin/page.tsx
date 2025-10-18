import { DashboardShell } from '@/components/ui/DashboardShell';
import { DataTable } from '@/components/ui/DataTable';

const rows = [
  { name: 'Jane Smith', role: 'Admin', status: 'Active' },
  { name: 'Omar Hussein', role: 'Owner', status: 'Active' },
];

export default function AdminPage() {
  return (
    <DashboardShell title="Organization settings">
      <DataTable
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'role', header: 'Role' },
          { key: 'status', header: 'Status' },
        ]}
        data={rows}
        emptyState="Invite users to see them listed here."
      />
    </DashboardShell>
  );
}
