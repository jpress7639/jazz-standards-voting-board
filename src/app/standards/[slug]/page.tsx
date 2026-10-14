import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStandard } from "@/lib/store";
import { VoteButton } from "@/components/VoteButton";

// The page shows live vote counts, so render per request like the list page.
export const dynamic = "force-dynamic";

// Next.js 15: params is a Promise and must be awaited.
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const standard = await getStandard(slug);

  return {
    title: standard
      ? `${standard.title} · Jazz Standards Board`
      : "Standard not found · Jazz Standards Board",
    description: standard?.blurb,
  };
}

export default async function StandardPage({ params }: Props) {
  const { slug } = await params;
  const standard = await getStandard(slug);

  // Unknown slug → renders not-found.tsx in this folder with a 404 status.
  if (!standard) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/"
        className="text-sm text-neutral-500 hover:text-amber-600"
      >
        ← All standards
      </Link>

      <header className="mt-6 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{standard.title}</h1>
          <p className="mt-2 text-neutral-500">
            {standard.composers.join(", ")}
          </p>
        </div>
        <VoteButton slug={standard.slug} votes={standard.votes} />
      </header>

      <dl className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
        <div>
          <dt className="text-xs uppercase tracking-widest text-neutral-400">Year</dt>
          <dd className="mt-1 font-medium">{standard.year}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-neutral-400">Form</dt>
          <dd className="mt-1 font-medium">{standard.form}</dd>
        </div>
      </dl>

      <p className="mt-8 text-lg leading-relaxed">{standard.blurb}</p>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {standard.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
          >
            {tag}
          </li>
        ))}
      </ul>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-600">
          Essential recordings
        </h2>
        <ul className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">
          {standard.recordings.map((recording) => (
            <li
              key={`${recording.artist}-${recording.album}`}
              className="flex items-baseline justify-between gap-4 py-3"
            >
              <div>
                <p className="font-medium">{recording.artist}</p>
                <p className="text-sm italic text-neutral-500">{recording.album}</p>
              </div>
              <span className="text-sm tabular-nums text-neutral-400">
                {recording.recorded}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}