import { DashboardShell } from '@/components/ui/DashboardShell';
import { DataTable } from '@/components/ui/DataTable';

const approvals = [
  { assistant: 'Lina Abdel', course: 'Math Level 2', status: 'Pending' },
  { assistant: 'Hassan Ali', course: 'Science Level 1', status: 'Approved' },
];

export default function SupervisorPage() {
  return (
    <DashboardShell title="Supervisor overview">
      <DataTable
        columns={[
          { key: 'assistant', header: 'Assistant' },
          { key: 'course', header: 'Course' },
          { key: 'status', header: 'Status' },
        ]}
        data={approvals}
        emptyState="No assistants awaiting approval."
      />
    </DashboardShell>
  );
}
