"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/favorites", label: "Saved" },
  { href: "/messages", label: "Messages" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-r from-sky-600 to-blue-600 px-4 py-3 text-white shadow-lg shadow-sky-500/20">
            K
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">KaarYab Afghanistan</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Opportunity finder</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  pathname === link.href
                    ? "bg-sky-600 text-white shadow-sm shadow-sky-500/20"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/add-opportunity"
              className="rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20"
            >
              Add Opportunity
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200/80 bg-slate-50 px-4 py-4 dark:border-slate-800/80 dark:bg-slate-950">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  pathname === link.href
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/add-opportunity"
              className="block rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
            >
              Add Opportunity
            </Link>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
