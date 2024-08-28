import type { Metadata } from "next";
import "./globals.css";
import RootProvider from "@/app/_providers/RootProvider";

export const metadata: Metadata = {
  title: "Smart Utils",
  description: "My smart utilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
