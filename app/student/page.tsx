import { DashboardShell } from '@/components/ui/DashboardShell';
import { ReportPreview } from '@/components/ui/ReportPreview';

export default function StudentPage() {
  return (
    <DashboardShell title="Your progress">
      <div className="max-w-3xl space-y-4">
        <ReportPreview
          studentName="You"
          courseName="Physics Level 1"
          month="October"
          summary="Assignments submitted on time. Work on lab reflections to increase clarity and depth."
        />
      </div>
    </DashboardShell>
  );
}
