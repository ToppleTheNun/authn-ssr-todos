import "~/styles/globals.css";

import { Inter, JetBrains_Mono } from "@next/font/google";
import clsx from "clsx";
import { ReactNode } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={clsx(
        "bg-gray-100 font-sans text-slate-900 antialiased",
        inter.variable,
        jetbrainsMono.variable
      )}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
