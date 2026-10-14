export type Recording = {
  artist: string;
  album: string;
  recorded: number;
};

export type Standard = {
  slug: string;
  title: string;
  composers: string[];
  year: number;
  form: string;
  tags: string[];
  blurb: string;
  recordings: Recording[];
  votes: number;
};