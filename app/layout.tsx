import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linkly - Link Tracker",
  description: "Track short links with analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full overflow-hidden bg-white text-gray-800`}>
        <SessionWrapper>
        <Navbar></Navbar>
        <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
