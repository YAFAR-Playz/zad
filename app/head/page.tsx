import { DashboardShell } from '@/components/ui/DashboardShell';
import { ReportPreview } from '@/components/ui/ReportPreview';

export default function HeadPage() {
  return (
    <DashboardShell title="Course head workspace">
      <div className="grid gap-4 lg:grid-cols-2">
        <ReportPreview
          studentName="Maya Selim"
          courseName="English Level 3"
          month="October"
          summary="Attendance 95%, assignments submitted 100%, focus on expanding vocabulary for next cycle."
        />
        <ReportPreview
          studentName="Karim Nader"
          courseName="Mathematics Level 2"
          month="October"
          summary="Improved quiz scores by 12%. Encourage additional practice sheets for geometry section."
        />
      </div>
    </DashboardShell>
  );
}
