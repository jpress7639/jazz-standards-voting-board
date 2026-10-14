import "server-only";
import seed from "@/data/standards.json";
import type { Standard } from "@/lib/type";
 
// In-memory store seeded from standards.json.
// Votes persist for the life of the server process and reset on restart (see README).
// Kept on globalThis so dev-mode hot reloads don't wipe votes between edits.
const globalStore = globalThis as typeof globalThis & {
  __standards?: Standard[];
};
 
const standards: Standard[] = (globalStore.__standards ??= structuredClone(
  seed as Standard[],
));
 
// Async on purpose: swapping in a real database later doesn't change any callers.
export async function getStandards(): Promise<Standard[]> {
  return [...standards].sort(
    (a, b) => b.votes - a.votes || a.title.localeCompare(b.title),
  );
}
 
export async function getStandard(slug: string): Promise<Standard | undefined> {
  return standards.find((s) => s.slug === slug);
}
 
export async function addVote(slug: string): Promise<Standard | undefined> {
  const standard = standards.find((s) => s.slug === slug);
  if (standard) standard.votes += 1;
  return standard;
}
 