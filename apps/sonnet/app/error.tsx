"use client";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-20 sm:px-10">
      <h1 className="text-2xl text-rose">Unable to load the note</h1>
      <p className="mt-4 text-subtle">Please try again in a moment.</p>
      <button
        type="button"
        onClick={retry}
        className="mt-6 cursor-pointer rounded-full border border-overlay px-5 py-2 hover:bg-surface"
      >
        Try again
      </button>
    </main>
  );
}
