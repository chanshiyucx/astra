import type { Metadata } from "next";
import Link from "next/link";
import { RefreshOnResume } from "../components/refresh-on-resume";
import { ThemeSwitcher } from "../components/theme-switcher";
import { NoteMarkdown } from "../components/markdown";
import { getDailyNote } from "../lib/notes";

export const metadata: Metadata = {
  title: "Daily · Sonnet",
};

export default async function Home() {
  const note = await getDailyNote();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-10">
      <RefreshOnResume />
      <header className="flex items-center justify-between py-7">
        <Link href="/" className="text-2xl tracking-tight text-text">
          sonnet<span className="text-rose">.</span>
        </Link>
        <ThemeSwitcher />
      </header>
      <main id="main" className="py-7 sm:py-10">
        <article aria-label={note.title}>
          <NoteMarkdown content={note.content} />
        </article>
      </main>
      <footer className="border-t border-overlay py-7 text-sm text-subtle">
        Per aspera ad astra
      </footer>
    </div>
  );
}
