"use client";

import { useOptimistic } from "react";
import { voteForStandard } from "@/actions/vote";

type Props = {
  slug: string;
  votes: number;
};

export function VoteButton({ slug, votes }: Props) {
  // Shows the incremented count immediately; snaps to the server value
  // once revalidation delivers fresh props.
  const [optimisticVotes, addOptimisticVote] = useOptimistic<number, void>(
    votes,
    (current) => current + 1,
  );

  return (
    <form
      className="shrink-0"
      action={async () => {
        addOptimisticVote();
        await voteForStandard(slug);
      }}
    >
      <button
        type="submit"
        aria-label={`Vote for this standard (currently ${optimisticVotes} votes)`}
        className="flex min-h-11 min-w-11 flex-col items-center justify-center rounded-lg border border-neutral-300 px-2.5 py-1.5 text-sm font-medium transition hover:border-amber-500 hover:text-amber-600 active:scale-95 sm:px-3 sm:py-2 dark:border-neutral-700"
      >
        <span aria-hidden="true">▲</span>
        <span className="tabular-nums">{optimisticVotes}</span>
      </button>
    </form>
  );
}