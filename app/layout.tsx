import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "devLonca - Yazılım Topluluğu & Açık Kaynak Platformu",
  description:
    "Yazılımcılar, öğrenciler ve açık kaynak geliştiricileri için teknik blog, soru-cevap ve staj/kariyer yardımlaşma platformu.",
  keywords: ["yazılım", "developer", "topluluk", "açık kaynak", "nextjs", "react", "staj", "stajyer"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
