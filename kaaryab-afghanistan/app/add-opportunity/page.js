"use client";

import { useRouter } from "next/navigation";
import OpportunityForm from "@/components/OpportunityForm";
import { addOpportunity } from "@/lib/storage";
import { useTranslation } from "@/lib/i18n";

export default function AddOpportunity() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleAdd = (data) => {
    addOpportunity({
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });
    router.push("/opportunities");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-blue-600">{t("form.title")}</h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {t("home.verifiedDesc")}
        </p>
      </div>
      <OpportunityForm onSubmit={handleAdd} />
    </div>
  );
}
