from pathlib import Path

root = Path(__file__).resolve().parent.parent
file_path = root / 'app' / 'opportunities' / '[id]' / 'page.js'

content = '''import { opportunities } from "@/data/opportunities";

export default function OpportunityDetail({ params }) {
  const opportunity = opportunities.find((item) => item.id === params.id);

  if (!opportunity) {
    return <h1>Opportunity not found</h1>;
  }

  return (
    <div className="space-y-10 p-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-blue-600">{opportunity.title}</h1>
          <p className="text-slate-600 dark:text-slate-300">{opportunity.organization}</p>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">{opportunity.category}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">{opportunity.location}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">{opportunity.type}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">Deadline {opportunity.deadline}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Description</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-7">{opportunity.description}</p>
          </section>

          {opportunity.requirements?.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Requirements</h2>
              <ul className="list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
                {opportunity.requirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
            </section>
          )}

          {opportunity.applyLink && (
            <a
              href={opportunity.applyLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Apply Now
            </a>
          )}
        </div>

        <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Opportunity details</h3>
            <div className="mt-4 space-y-3 text-slate-700 dark:text-slate-300">
              <p><strong>Category:</strong> {opportunity.category}</p>
              <p><strong>Location:</strong> {opportunity.location}</p>
              <p><strong>Type:</strong> {opportunity.type}</p>
              <p><strong>Deadline:</strong> {opportunity.deadline}</p>
            </div>
          </div>

          {opportunity.tags?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Tags</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {opportunity.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1 text-sm text-slate-700 shadow-sm dark:bg-slate-950 dark:text-slate-200">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
'''
file_path.write_text(content, encoding='utf-8')
print('updated page')
