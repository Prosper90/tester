import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { cookieToInitialState } from 'wagmi';
import { config } from '@/config';
import { headers } from 'next/headers';
import AppKitProvider from '@/context';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Galactic Gold Rush",
  description: "Tap to earn game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch initial state from cookies; this will run server-side
  const initialState = cookieToInitialState(config, headers().get('cookie') || '');

  return (
    <html lang="en">
      <head>
        {/* Inject Telegram Web App script; ensure it's loaded before Next.js hydration */}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        {/* Wrap the application with your context provider */}
        <AppKitProvider initialState={initialState}>
          {children}
        </AppKitProvider>
      </body>
    </html>
  );
}
