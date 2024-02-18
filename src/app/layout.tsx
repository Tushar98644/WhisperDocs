import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import QueryProvider from "@/providers/query_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhisperDocs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body className={`${inter.className}`}>{children}</body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
