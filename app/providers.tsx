"use client";

import { useEffect, type ReactNode } from "react";
import ReactLenis, { useLenis } from "lenis/react";
import { scrollStore } from "@/lib/scroll-store";

function ScrollTracker() {
  useLenis(({ progress }: { progress: number }) => {
    scrollStore.progress = progress;
  });
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
        duration: 1.2,
      }}
    >
      <ScrollTracker />
      {children}
    </ReactLenis>
  );
}
