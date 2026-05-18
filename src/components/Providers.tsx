"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, Suspense } from "react";
import NavigationProgress from "@/components/NavigationProgress";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Suspense>
        <NavigationProgress />
      </Suspense>
      {children}
    </SessionProvider>
  );
}