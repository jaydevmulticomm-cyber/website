import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center text-slate-900 md:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Page not found</p>
        <h1 className="mt-4 text-4xl font-black sm:text-5xl">We couldn't find that page.</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">The page you are looking for may have moved, or the link may be broken. Use the navigation below to continue exploring our chemical export services.</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/" className="rounded-2xl bg-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal2">Home</Link>
          <Link href="/quote" className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">Request Quote</Link>
        </div>
      </div>
    </main>
  );
}
