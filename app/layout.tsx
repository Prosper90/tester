import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'
import { headers } from 'next/headers'

import AppKitProvider from '@/context'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Galactic Gold Rush",
  description: "Tap to earn game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <html lang="en">
      <head>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <AppKitProvider initialState={initialState}>
      <body className={inter.className}>{children}</body></AppKitProvider>
    </html>
  );
}
