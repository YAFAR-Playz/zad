interface ReportPreviewProps {
  studentName: string;
  courseName: string;
  month: string;
  summary: string;
}

export function ReportPreview({ studentName, courseName, month, summary }: ReportPreviewProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#073B4C]">{studentName}</h3>
          <p className="text-sm text-slate-500">{courseName}</p>
        </div>
        <span className="rounded-full bg-[#A9D8C7] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#073B4C]">
          {month}
        </span>
      </header>
      <p className="mt-4 text-sm text-slate-600">{summary}</p>
    </article>
  );
}
