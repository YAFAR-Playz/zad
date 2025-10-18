import { DashboardShell } from '@/components/ui/DashboardShell';
import { ReportPreview } from '@/components/ui/ReportPreview';

const children = [
  {
    studentName: 'Maya Selim',
    courseName: 'English Level 3',
    month: 'October',
    summary: 'Strong participation. Encourage daily reading aloud to reinforce comprehension.',
  },
  {
    studentName: 'Karim Selim',
    courseName: 'Mathematics Level 2',
    month: 'October',
    summary: 'Consistent homework submissions. Monitor focus during online sessions.',
  },
];

export default function ParentPage() {
  return (
    <DashboardShell title="Family overview">
      <div className="grid gap-4 lg:grid-cols-2">
        {children.map((child) => (
          <ReportPreview key={child.studentName} {...child} />
        ))}
      </div>
    </DashboardShell>
  );
}
