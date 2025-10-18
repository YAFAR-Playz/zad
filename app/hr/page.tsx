import { DashboardShell } from '@/components/ui/DashboardShell';
import { DataTable } from '@/components/ui/DataTable';

const payroll = [
  { assistant: 'Layla A.', month: 'October', total: '$1,200', status: 'Generated' },
  { assistant: 'Omar R.', month: 'October', total: '$1,050', status: 'Pending approval' },
];

export default function HrPage() {
  return (
    <DashboardShell title="Payroll center">
      <DataTable
        columns={[
          { key: 'assistant', header: 'Assistant' },
          { key: 'month', header: 'Month' },
          { key: 'total', header: 'Total' },
          { key: 'status', header: 'Status' },
        ]}
        data={payroll}
        emptyState="Generate salary slips to review them here."
      />
    </DashboardShell>
  );
}
