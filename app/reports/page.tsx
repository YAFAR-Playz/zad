import { DashboardShell } from '@/components/ui/DashboardShell';
import { Button } from '@/components/ui/Button';
import { ReportPreview } from '@/components/ui/ReportPreview';

export default function ReportsPage() {
  return (
    <DashboardShell title="Reports center">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-[#073B4C]">Monthly reports</h3>
          <Button>Generate new batch</Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <ReportPreview
            studentName="Maya Selim"
            courseName="English Level 3"
            month="October"
            summary="Ready for parent distribution."
          />
          <ReportPreview
            studentName="Karim Nader"
            courseName="Mathematics Level 2"
            month="October"
            summary="Awaiting supervisor approval."
          />
        </div>
      </div>
    </DashboardShell>
  );
}
