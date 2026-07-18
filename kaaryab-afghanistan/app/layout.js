import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "KaarYab Afghanistan",
  description: "Find jobs, scholarships, internships and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Navbar />

        <main className="p-6 max-w-7xl mx-auto">{children}</main>

        <footer className="text-center p-4 border-t mt-10 text-sm text-slate-500 dark:text-slate-400">
          © 2026 KaarYab Afghanistan
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Note: This website uses Demo Data for educational purposes.</p>
        </footer>
      </body>
    </html>
  );
}
