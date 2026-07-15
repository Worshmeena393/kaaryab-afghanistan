"use client";

import { useRouter } from "next/navigation";
import OpportunityForm from "@/components/OpportunityForm";
import { addOpportunity } from "@/lib/storage";

export default function AddOpportunity() {
  const router = useRouter();

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
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Add Opportunity</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Share a new opportunity with the community. Required fields are title, organization, location, deadline, description, and apply link.
      </p>
      <OpportunityForm onSubmit={handleAdd} />
    </div>
  );
}
