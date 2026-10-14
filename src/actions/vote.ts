"use server";
 
import { revalidatePath } from "next/cache";
import { addVote } from "@/lib/store";
 
export async function voteForStandard(slug: string): Promise<number> {
  // Server actions are public POST endpoints, so validate input even though
  // our own UI only ever sends known slugs.
  if (typeof slug !== "string" || slug.length === 0) {
    throw new Error("Invalid slug");
  }
 
  const updated = await addVote(slug);
  if (!updated) {
    throw new Error(`Unknown standard: ${slug}`);
  }
 
  // The list is sorted by votes, so a vote can reorder it.
  revalidatePath("/");
  revalidatePath(`/standards/${slug}`);
 
  return updated.votes;
}