interface SummaryItem {
  label: string;
  value: string;
  trend?: string;
}

interface SummaryGridProps {
  items: SummaryItem[];
}

export function SummaryGrid({ items }: SummaryGridProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">{item.label}</h3>
          <p className="mt-2 text-2xl font-semibold text-[#073B4C]">{item.value}</p>
          {item.trend && <p className="mt-1 text-xs text-slate-400">{item.trend}</p>}
        </article>
      ))}
    </section>
  );
}
