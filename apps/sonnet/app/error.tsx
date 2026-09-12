"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-20 sm:px-10">
      <h1 className="text-2xl text-rose">暂时无法加载笔记</h1>
      <p className="mt-4 text-subtle">请稍后重试。</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 cursor-pointer rounded-full border border-overlay px-5 py-2 hover:bg-surface"
      >
        重新加载
      </button>
    </main>
  );
}
