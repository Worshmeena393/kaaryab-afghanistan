import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "KaarYab Afghanistan",
  description: "Find jobs, scholarships, internships and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        {/* NAVBAR */}
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-blue-600 text-xl">
            KaarYab Afghanistan
          </h1>

          <div className="flex gap-4 text-sm flex-wrap">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/opportunities">Opportunities</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/favorites">Favorites ❤️</Link>
            <Link href="/messages">Messages</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/add-opportunity">Add</Link>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="p-6">{children}</main>

        {/* FOOTER */}
        <footer className="text-center p-4 border-t mt-10 text-sm">
          © 2026 KaarYab Afghanistan
        </footer>

      </body>
    </html>
  );
}