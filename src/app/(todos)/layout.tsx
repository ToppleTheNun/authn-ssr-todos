import { ReactNode } from "react";

import Header from "~/components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">{children}</main>
    </div>
  );
}
