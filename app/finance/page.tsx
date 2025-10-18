import { DashboardShell } from '@/components/ui/DashboardShell';
import { DataTable } from '@/components/ui/DataTable';

const ledger = [
  { type: 'Expense', description: 'Zoom subscription', amount: '$140', date: '2025-10-05' },
  { type: 'Income', description: 'Parent subscription', amount: '$299', date: '2025-10-01' },
];

export default function FinancePage() {
  return (
    <DashboardShell title="Finance ledger">
      <DataTable
        columns={[
          { key: 'type', header: 'Type' },
          { key: 'description', header: 'Description' },
          { key: 'amount', header: 'Amount' },
          { key: 'date', header: 'Date' },
        ]}
        data={ledger}
        emptyState="Add a finance record to get started."
      />
    </DashboardShell>
  );
}
