"use client";

import { CssBaseline, GeistProvider } from "@geist-ui/core";
import { PropsWithChildren } from "react";
import AuthProvider from "./AuthProvider";

export default function RootProvider({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <GeistProvider>
        <CssBaseline />
        {children}
      </GeistProvider>
    </AuthProvider>
  );
}
