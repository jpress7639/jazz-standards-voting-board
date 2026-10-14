import Link from "next/link";
import { getStandards } from "@/lib/store";
import { VoteButton } from "@/components/VoteButton";

// Votes change at runtime, so render on every request instead of prerendering at build.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const standards = await getStandards();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      <header className="mb-8 sm:mb-10">
        <p className="title text-xs font-semibold uppercase tracking-widest text-amber-600 sm:text-sm">
          Jazz Standards Board
        </p>
        <h1 className="font-display mt-2 text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Which standard should students learn?
        </h1>
        <p className="mt-3 text-sm text-neutral-500 sm:text-base">
          Vote for your favorites. The list re-sorts as votes come in.
        </p>
      </header>

      <ol className="space-y-3">
        {standards.map((standard, index) => (
          // Votes reorder the list, so key by slug instead of index.
          <li
            key={standard.slug}
            className="standard flex items-center gap-3 rounded-xl border border-neutral-200 p-3 transition hover:border-neutral-400 sm:gap-4 sm:p-4 dark:border-neutral-800 dark:hover:border-neutral-600"
          >
            <span className="hidden w-6 shrink-0 text-right text-sm tabular-nums text-neutral-400 sm:block">
              {index + 1}
            </span>

            <div className="min-w-0 flex-1">
              <Link
                href={`/standards/${standard.slug}`}
                className="text-base font-semibold hover:text-amber-600 sm:text-lg"
              >
                <span className="text-neutral-400 sm:hidden">{index + 1}. </span>
                {standard.title}
              </Link>
              <p className="truncate text-sm text-neutral-500">
                {standard.composers.join(", ")} · {standard.year}
              </p>
              <ul className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
                {standard.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sibling of the Link, not inside it: a button in an anchor is invalid HTML. */}
            <VoteButton slug={standard.slug} votes={standard.votes} />
          </li>
        ))}
      </ol>
    </main>
  );
}

