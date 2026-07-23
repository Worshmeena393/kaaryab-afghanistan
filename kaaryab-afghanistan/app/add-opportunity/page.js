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
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">{t("form.title")}</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        {t("home.verifiedDesc")}
      </p>
      <OpportunityForm onSubmit={handleAdd} />
    </div>
  );
}
