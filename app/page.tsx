export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-8 text-center">
      <h1 className="text-4xl font-bold text-[#073B4C]">RadSystems Platform</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Multi-tenant education management with assistants, students, HR, finance, and parent portals in one workspace.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href="/login"
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-[#CF441E] px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#a93617] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073B4C]"
        >
          Sign in
        </a>
        <a
          href="/register"
          className="inline-flex items-center justify-center rounded-lg border border-[#073B4C] bg-white px-6 py-2 text-sm font-semibold text-[#073B4C] shadow-sm transition hover:bg-[#073B4C] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073B4C]"
        >
          Create organization
        </a>
      </div>
    </main>
  );
}
