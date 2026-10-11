import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import ClientRootLayout from "@/components/ClientRootLayout"; // To be created
import { Analytics } from "@vercel/analytics/next"; // 1. Import Vercel Analytics

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-one-taupe-42.vercel.app'),
  title: 'SweetyCodes | AI Engineer & Full-Stack Developer',
  description: 'Portfolio of Subhashree Behera (Sweety) — AI engineer and full-stack developer. AI Evaluation Engineer via Handshake AI, building multi-agent systems, LLM apps with structured output and AI agent benchmarks, shipped with Next.js, TypeScript, Python and FastAPI.',
  keywords: ['SweetyCodes', 'Subhashree Behera', 'AI Engineer', 'AI Evaluation Engineer', 'Full-Stack Developer', 'Multi-Agent Systems', 'LLM Applications', 'AI Agents', 'Structured Output', 'Gemini API', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Remote Developer'],
  authors: [{ name: 'Subhashree Behera (Sweety)', url: 'https://portfolio-one-taupe-42.vercel.app' }],
  creator: 'SweetyCodes',
  openGraph: {
    type: 'website',
    url: 'https://portfolio-one-taupe-42.vercel.app',
    title: 'SweetyCodes | AI Engineer & Full-Stack Developer',
    description: 'Multi-agent systems, LLM apps with structured output and AI agent benchmarks — shipped as full-stack products. Open to remote AI and full-stack roles.',
    siteName: 'SweetyCodes Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SweetyCodes | AI Engineer & Full-Stack Developer',
    description: 'Multi-agent systems, LLM apps and AI agent benchmarks — shipped as full-stack products.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="custom-scrollbar">
        <ClientRootLayout>{children}</ClientRootLayout>
        <Analytics /> {/* 2. Add the component right before the closing body tag */}
      </body>
    </html>
  );
}