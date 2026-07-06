import { opportunities } from "@/data/opportunities";

export default function OpportunityDetail({ params }) {
  const opportunity = opportunities.find(
    (item) => item.id === params.id
  );

  if (!opportunity) {
    return <h1>Opportunity not found</h1>;
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-blue-600">
        {opportunity.title}
      </h1>

      <p className="text-gray-600 mt-2">
        {opportunity.organization}
      </p>

      <div className="mt-4 space-y-2">

        <p><b>Category:</b> {opportunity.category}</p>
        <p><b>Location:</b> {opportunity.location}</p>
        <p><b>Type:</b> {opportunity.type}</p>
        <p><b>Deadline:</b> {opportunity.deadline}</p>

      </div>

      <p className="mt-4">
        {opportunity.description}
      </p>

    </div>
  );
}