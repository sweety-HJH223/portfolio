import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import type { ReactNode } from "react";
import ClientRootLayout from "@/components/ClientRootLayout"; // To be created

export const metadata: Metadata = {
  title: 'SweetyCodes | Full-Stack Developer & AI Engineer',
  description: 'Portfolio of Subhashree Behera — Full-Stack Developer and AI Engineer specializing in React, Python automation, and AI integration. Hackathon winner open for remote work globally.',
  keywords: ['Full-Stack Developer', 'AI Engineer', 'React', 'Python', 'Next.js', 'Web Scraping', 'AI Integration', 'Remote Developer', 'Indian Developer'],
  authors: [{ name: 'Subhashree Behera', url: 'https://portfolio-one-taupe-42.vercel.app' }],
  creator: 'SweetyCodes',
  openGraph: {
    type: 'website',
    url: 'https://portfolio-one-taupe-42.vercel.app',
    title: 'SweetyCodes | Full-Stack Developer & AI Engineer',
    description: 'Building responsive web apps, Python automation systems and AI-powered tools. Hackathon winner open for remote work.',
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
    title: 'SweetyCodes | Full-Stack Developer & AI Engineer',
    description: 'Building web apps, Python automation and AI tools. Open for remote work!',
    images: ['/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
