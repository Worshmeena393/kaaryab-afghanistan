import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "KaarYab Afghanistan",
  description: "Find jobs, scholarships, internships and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <LanguageProvider>
          <ClientLayout>{children}</ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
