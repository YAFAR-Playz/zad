import Link from 'next/link';

const navItems = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/admin', label: 'Admin' },
  { href: '/supervisor', label: 'Supervisor' },
  { href: '/head', label: 'Course Head' },
  { href: '/assistant', label: 'Assistants' },
  { href: '/student', label: 'Students' },
  { href: '/parent', label: 'Parents' },
  { href: '/hr', label: 'HR' },
  { href: '/finance', label: 'Finance' },
  { href: '/reports', label: 'Reports' },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white/80 p-6 shadow-md lg:flex">
      <span className="text-lg font-semibold text-[#073B4C]">RadSystems</span>
      <nav className="mt-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#A9D8C7]/40 hover:text-[#073B4C]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
