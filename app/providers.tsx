"use client";

import { type ReactNode } from "react";
import ReactLenis from "lenis/react";

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
      {children}
    </ReactLenis>
  );
}
