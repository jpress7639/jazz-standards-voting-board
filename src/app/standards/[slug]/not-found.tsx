import Link from "next/link";

export default function StandardNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        That tune isn&apos;t in the book.
      </h1>
      <p className="mt-3 text-neutral-500">
        We couldn&apos;t find a standard at this address.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:border-amber-500 hover:text-amber-600 dark:border-neutral-700"
      >
        Back to all standards
      </Link>
    </main>
  );
}