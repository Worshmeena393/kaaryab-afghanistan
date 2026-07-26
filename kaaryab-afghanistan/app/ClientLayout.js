"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
      <Footer />
    </>
  );
}
