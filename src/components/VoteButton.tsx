"use client";

import { useOptimistic } from "react";
import { voteForStandard } from "@/actions/vote";

type Props = {
  slug: string;
  votes: number;
};

export function VoteButton({ slug, votes }: Props) {
  // shows the increment count optimistically before server confirmation
  // Initialize optimistic state for votes
  const [optimisticVotes, addOptimisticVote] = useOptimistic<number, void>(
    votes,
    (current) => current + 1,
    // The second argument is the function to update the state optimistically.
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
        // The slash here seems to be a typo and should be removed.
        className=" white flex min-h-11 min-w-11 flex-col items-center justify-center rounded-lg border border-neutral-300 px-2.5 py-1.5 text-sm font-medium transition hover:border-amber-500 hover:text-amber-600 active:scale-95 sm:px-3 sm:py-2 dark:border-neutral-700"
      >
        <span aria-hidden="true">▲</span>
        <span className="tabular-nums">{optimisticVotes}</span>
      </button>
    </form>
  );
}