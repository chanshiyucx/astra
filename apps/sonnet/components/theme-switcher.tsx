"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};
const options = [
  {
    value: "light",
    label: "浅色",
    path: "M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4",
    circle: true,
  },
  {
    value: "dark",
    label: "深色",
    path: "M20.9 13a9 9 0 0 1-9.9-9.9A9 9 0 1 0 20.9 13Z",
  },
  {
    value: "system",
    label: "跟随系统",
    path: "M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm8 13v4m-4 0h8",
  },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    <div
      role="group"
      aria-label="主题"
      className="flex gap-0.5 rounded-full border border-overlay p-0.5"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-label={option.label}
          title={option.label}
          aria-pressed={mounted && theme === option.value}
          onClick={() => setTheme(option.value)}
          className="flex size-8 cursor-pointer items-center justify-center rounded-full text-subtle transition-colors hover:bg-surface hover:text-text aria-pressed:bg-overlay aria-pressed:text-text"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d={option.path} />
            {"circle" in option && <circle cx="12" cy="12" r="4" />}
          </svg>
        </button>
      ))}
    </div>
  );
}
