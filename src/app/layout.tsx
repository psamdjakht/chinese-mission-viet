import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chinese Mission Việt — Học giao tiếp tiếng Trung",
  description: "Luyện giao tiếp tiếng Trung theo nhiệm vụ thực tế, có pinyin, nghĩa Việt, nhận giọng nói và hội thoại AI.",
  manifest: "/manifest.webmanifest",
  applicationName: "Chinese Mission Việt",
};
export const viewport: Viewport = { themeColor: "#dcfce9", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased font-sans">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2">Đi đến nội dung chính</a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
