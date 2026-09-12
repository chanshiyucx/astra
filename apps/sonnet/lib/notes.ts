import "server-only";

import matter from "gray-matter";

// Only this explicitly published note is exposed by Sonnet.
const dailyNoteUrl =
  "https://api.github.com/repos/chanshiyucx/obsidian/contents/Polyglot/English/Writing/002-Daily.md?ref=main";

export async function getDailyNote() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not configured on the server.");

  const response = await fetch(dailyNoteUrl, {
    headers: {
      Accept: "application/vnd.github.raw+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2026-03-10",
    },
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(10_000),
    redirect: "error",
  });

  if (!response.ok) {
    throw new Error(
      `Unable to load the daily note (GitHub HTTP ${response.status}).`,
    );
  }

  const { data, content } = matter(await response.text());
  return {
    title: typeof data.title === "string" ? data.title : "Daily",
    content,
  };
}
