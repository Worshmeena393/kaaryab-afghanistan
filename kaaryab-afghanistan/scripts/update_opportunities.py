from pathlib import Path

root = Path(r'C:/Users/DELL 7390/OneDrive/Documents/kaaryab-afghanistan/kaaryab-afghanistan/kaaryab-afghanistan')

page_path = root / 'app' / 'opportunities' / 'page.js'
storage_path = root / 'lib' / 'storage.js'
data_path = root / 'data' / 'opportunities.js'

page_text = page_path.read_text(encoding='utf-8')
page_text = page_text.replace(
    'const categories = ["All", "Job", "Internship", "Scholarship", "Online course", "Remote work", "Volunteer work"];\nconst types = ["All", "Remote", "On-site"];\nconst deadlineOptions = ["All", "Next 14 days", "Next 30 days"];\n',
    'const categories = ["All", "Job", "Internship", "Scholarship", "Online course", "Remote work", "Volunteer work", "Advanced Training", "Professional Development"];\nconst types = ["All", "Remote", "On-site", "Hybrid"];\nconst deadlineOptions = ["All", "Next 14 days", "Next 30 days"];\n'
)
page_path.write_text(page_text, encoding='utf-8')

storage_text = storage_path.read_text(encoding='utf-8')
storage_text = storage_text.replace(
    'export function getStoredOpportunities() {\n  if (typeof window === "undefined") return opportunities;\n\n  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");\n\n  if (!stored) {\n    localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));\n    return opportunities;\n  }\n\n  return stored;\n}\n',
    'export function getStoredOpportunities() {\n  if (typeof window === "undefined") return opportunities;\n\n  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");\n\n  if (!stored) {\n    localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));\n    return opportunities;\n  }\n\n  const storedIds = new Set(stored.map((item) => item.id));\n  const missingDefaults = opportunities.filter((item) => !storedIds.has(item.id));\n\n  if (missingDefaults.length > 0) {\n    const updated = [...stored, ...missingDefaults];\n    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));\n    return updated;\n  }\n\n  return stored;\n}\n'
)
storage_path.write_text(storage_text, encoding='utf-8')

new_data = '''export const opportunities = [
  {
    id: "1",
    title: "Frontend Developer Job",
    organization: "Kabul Tech Community",
    category: "Job",
    location: "Kabul",
    type: "Remote",
    deadline: "2026-07-20",
    description: "Work as frontend developer using React",
    tags: ["React", "Frontend"]
  },
  {
    id: "2",
    title: "React Internship",
    organization: "Tech Academy",
    category: "Internship",
    location: "Online",
    type: "Remote",
    deadline: "2026-08-01",
    description: "Learn React and build projects",
    tags: ["React", "Internship"]
  },
  {
    id: "3",
    title: "Scholarship for Students",
    organization: "Global Education",
    category: "Scholarship",
    location: "Online",
    type: "Remote",
    deadline: "2026-09-10",
    description: "Full scholarship for online study",
    tags: ["Scholarship", "Education"]
  },
  {
    id: "4",
    title: "UX Designer Contract",
    organization: "DesignWorks",
    category: "Remote work",
    location: "Herat",
    type: "On-site",
    deadline: "2026-07-30",
    description: "Short-term UX design contract for a civic project",
    tags: ["UX", "Design"]
  },
  {
    id: "5",
    title: "Data Science Bootcamp",
    organization: "Analytics Hub",
    category: "Advanced Training",
    location: "Online",
    type: "Remote",
    deadline: "2026-08-15",
    description: "Intensive bootcamp covering Python and ML basics",
    tags: ["Data", "Machine Learning"]
  },
  {
    id: "6",
    title: "Volunteer Community Organizer",
    organization: "Local NGO",
    category: "Volunteer work",
    location: "Mazar-i-Sharif",
    type: "On-site",
    deadline: "2026-07-25",
    description: "Coordinate community outreach and events",
    tags: ["Volunteer", "Community"]
  },
  {
    id: "7",
    title: "Mobile App Developer",
    organization: "Startup X",
    category: "Remote work",
    location: "Remote",
    type: "Remote",
    deadline: "2026-08-05",
    description: "Develop React Native features for a mobile app",
    tags: ["Mobile", "React Native"]
  },
  {
    id: "8",
    title: "AI Product Manager Fellowship",
    organization: "Future Labs",
    category: "Professional Development",
    location: "Kabul",
    type: "Hybrid",
    deadline: "2026-09-01",
    description: "Apply to a fellowship combining AI product strategy, user research, and technical leadership.",
    tags: ["AI", "Product", "Fellowship"]
  },
  {
    id: "9",
    title: "Cybersecurity Specialist Program",
    organization: "SecureNet",
    category: "Advanced Training",
    location: "Online",
    type: "Remote",
    deadline: "2026-08-20",
    description: "Develop advanced cybersecurity skills with hands-on incident response labs.",
    tags: ["Cybersecurity", "Security", "Training"]
  },
  {
    id: "10",
    title: "Senior UX Research Role",
    organization: "UserFirst",
    category: "Job",
    location: "Kabul",
    type: "On-site",
    deadline: "2026-08-12",
    description: "Lead UX research for large-scale apps and mentor junior designers.",
    tags: ["UX", "Research", "Leadership"]
  },
  {
    id: "11",
    title: "Data Science Immersion",
    organization: "Insight Academy",
    category: "Advanced Training",
    location: "Online",
    type: "Remote",
    deadline: "2026-09-15",
    description: "Immersive data science bootcamp with project mentorship and portfolio review.",
    tags: ["Data", "ML", "Portfolio"]
  },
  {
    id: "12",
    title: "Blockchain Developer Fellowship",
    organization: "ChainForge",
    category: "Professional Development",
    location: "Remote",
    type: "Remote",
    deadline: "2026-09-05",
    description: "Work on blockchain infrastructure and smart contract development with expert mentors.",
    tags: ["Blockchain", "Smart Contracts", "Fellowship"]
  },
  {
    id: "13",
    title: "Social Impact Innovation Lab",
    organization: "Impact Catalyst",
    category: "Volunteer work",
    location: "Herat",
    type: "On-site",
    deadline: "2026-07-28",
    description: "Join a collaborative lab building tech solutions for education and health.",
    tags: ["Social Impact", "Innovation", "Volunteer"]
  },
  {
    id: "14",
    title: "Executive Leadership Scholarship",
    organization: "Global Leaders Fund",
    category: "Scholarship",
    location: "Online",
    type: "Remote",
    deadline: "2026-10-01",
    description: "Scholarship for senior professionals pursuing executive leadership training.",
    tags: ["Leadership", "Scholarship", "Executive"]
  }
]
'''
data_path.write_text(new_data, encoding='utf-8')
print('done')
"