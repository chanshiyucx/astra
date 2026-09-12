"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const refreshInterval = 60_000;

/** Revalidate a resumed page without reloading it or losing its scroll position. */
export function RefreshOnResume() {
  const router = useRouter();

  useEffect(() => {
    let lastRefresh = Date.now();

    function refreshIfStale() {
      if (document.visibilityState !== "visible" || !navigator.onLine) return;
      const now = Date.now();
      if (now - lastRefresh < refreshInterval) return;

      // visibilitychange and pageshow can fire for the same restoration.
      lastRefresh = now;
      router.refresh();
    }

    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) refreshIfStale();
    }

    document.addEventListener("visibilitychange", refreshIfStale);
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("online", refreshIfStale);
    return () => {
      document.removeEventListener("visibilitychange", refreshIfStale);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("online", refreshIfStale);
    };
  }, [router]);

  return null;
}
