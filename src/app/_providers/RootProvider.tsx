"use client"

import { CssBaseline, GeistProvider } from "@geist-ui/core";
import { PropsWithChildren } from "react";

export default function RootProvider({ children }: PropsWithChildren) {
    return (
        <GeistProvider>
          <CssBaseline/>
          {children}
        </GeistProvider>
    );
}