import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import type { ReactNode } from "react";
import ClientRootLayout from "@/components/ClientRootLayout"; // To be created

export const metadata: Metadata = {
  title: 'SweetyCodes | AI & Full-Stack Developer | Building AI-Powered Web Apps',
  description: 'Portfolio of Sweety (Subhashree Behera) — Full-Stack Developer and AI Engineer specializing in React, Python automation, and AI integration. Fast-learner open for remote work globally.',
  keywords: ['SweetyCodes', 'Subhashree Behera', 'Full-Stack Developer', 'AI Engineer', 'React', 'Python', 'Next.js', 'Web Scraping', 'AI Integration', 'Remote Developer', 'Indian Developer'],
  authors: [{ name: 'Subhashree Behera (Sweety)', url: 'https://portfolio-one-taupe-42.vercel.app' }],
  creator: 'SweetyCodes',
  openGraph: {
    type: 'website',
    url: 'https://portfolio-one-taupe-42.vercel.app',
    title: 'SweetyCodes | AI & Full-Stack Developer | Building AI-Powered Web Apps',
    description: 'Building responsive web apps, Python automation systems and AI-powered tools. Fast-learner open for remote work.',
    siteName: 'SweetyCodes Portfolio',
    images: [
      {
        url: '/profile.png',
        width: 1200,
        height: 630,
        alt: 'SweetyCodes Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SweetyCodes | AI & Full-Stack Developer | Building AI-Powered Web Apps',
    description: 'Building web apps, Python automation and AI tools. Open for remote work!',
    images: ['/profile.png'],
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
    <html lang="en" suppressHydrationWarning>
      <body className="custom-scrollbar">
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
