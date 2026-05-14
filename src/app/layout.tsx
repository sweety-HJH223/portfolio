import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import type { ReactNode } from "react";
import ClientRootLayout from "@/components/ClientRootLayout"; // To be created

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio site",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="custom-scrollbar">
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
