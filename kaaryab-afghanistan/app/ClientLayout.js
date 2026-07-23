"use client";

import Navbar from "@/components/Navbar";
import { useTranslation } from "@/lib/i18n";

export default function ClientLayout({ children }) {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
      <footer className="text-center p-4 border-t mt-10 text-sm text-slate-500 dark:text-slate-400">
        {t("footer.copyright")}
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {t("footer.note")}
        </p>
      </footer>
    </>
  );
}
