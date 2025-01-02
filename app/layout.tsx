import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import type { Metadata, Viewport } from 'next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Ekyooto Boston',
  description: 'Connect with the Ugandan community in Boston',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#9333ea',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
