# Jazz Standards Board
 
A small Next.js app for voting on which jazz standards everyone should learn next. The home page lists a curated set of standards, sorted by votes and rendered on the server. Each standard has a detail page with its composers, form, background, and essential recordings.
 
Built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.
 
## Getting started
 
**Prerequisites:** Node.js 18.18 or later.
 
```bash
git clone <repo-url>
cd bhf-next
npm install
npm run dev
```
 
Then open [http://localhost:3000](http://localhost:3000).
 
To run a production build:
 
```bash
npm run build
npm start
```
 
## How it works
 
### Server-rendered list (`src/app/page.tsx`)
 
The home page is an async React Server Component. It reads directly from the data layer (`src/lib/store.ts`) with no API route or client-side fetch, and it ships no JavaScript except the vote buttons. Standards are sorted by vote count, with ties broken alphabetically.
 
### Server action (`src/actions/vote.ts`)
 
`voteForStandard(slug)` adds one vote to a standard. It:
 
1. Validates the slug, since server actions are publicly callable POST endpoints.
2. Increments the vote count in the store.
3. Calls `revalidatePath` for both the list and the detail page, because a vote can change the list's sort order.
The `VoteButton` client component calls the action through a `<form action>` and uses React's `useOptimistic` so the count updates instantly, then settles to the server's value once the revalidated page arrives.
 
### Dynamic route (`src/app/standards/[slug]/page.tsx`)
 
`/standards/[slug]` shows the detail view for one standard: composers, year, form, background, tags, and essential recordings. You can vote from this page too. Following the Next.js 15 API, `params` is awaited as a Promise. Unknown slugs call `notFound()`, which returns a real 404 status and renders the route's custom `not-found.tsx`. `generateMetadata` gives each standard its own page title and description.
 
## Project structure
 
```
src/
├── actions/vote.ts              # server action
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # list page
│   └── standards/[slug]/
│       ├── page.tsx             # detail page
│       └── not-found.tsx        # 404 for unknown slugs
├── components/VoteButton.tsx    # the only client component
├── data/standards.json          # seed data
└── lib/
    ├── store.ts                 # data access (server-only)
    └── types.ts
```
 
All data access goes through `lib/store.ts`, so pages and actions never touch the data source directly.
 
## Assumptions and decisions
 
- **Persistence is in-memory.** The store is seeded from `standards.json` and lives for the life of the server process, so votes reset on restart. The brief asked for a server action that changes something meaningful, not durable storage, so I kept the scope tight. On serverless hosts such as Vercel, separate instances wouldn't share votes. The store's functions are async even though the data is in memory, so swapping in SQLite or Postgres would only change `store.ts`.
- **There are no accounts or vote limits.** Anyone can vote any number of times. A real version would need auth or at least rate limiting.
- **Both pages render dynamically** (`force-dynamic`), because they show live vote counts. If the detail page didn't show votes, I'd prerender it with `generateStaticParams`.
- **The data is hand-curated.** I chose to use a small JSON data set instead of using a mock API, to avoid an external dependency and to fit the theme. Starting vote counts are arbitrary, so the sorting is visible on first load. Years and forms are the commonly cited ones, and a few are arguable.
- **The store uses `server-only`**, so importing it into a client component fails the build.
## What I'd do with more time
 
- Persist votes in a database, and wrap reads in React's `cache()` to deduplicate the lookups that `generateMetadata` and the page both make.
- Limit votes to one per visitor.
- Add filtering by tag (era, form, difficulty) through search params.
- Add tests for the store and the server action.
## AI usage
 
I used Claude (in the claude.ai chat interface) as a pair-programming assistant. This tool doesn't use an instruction or context file like `CLAUDE.md`, so there's nothing to commit. I directed it conversationally: debating on how to approach this problem and what the focus should be on. Eventually, I chose the theme and scope, along with the hierarchal structure. Having already had a JSON file, I also had asked how each standard should be routed and agreed on writing the [slug] component method. 

## Time spent

### Tuesday, Oct 13:
30 minutes (11AM - 11:30AM) initial app setup and dependencies

### Wednesday, Oct 14: 
About 2 hours (12:15–2:15 PM).
 