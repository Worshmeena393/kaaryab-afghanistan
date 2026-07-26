const today = new Date();
const addDays = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
};

export const opportunities = [
  {
    id: "1",
    title: "Frontend Developer Job",
    organization: "Kabul Tech Community",
    category: "Job",
    location: "Kabul",
    type: "Remote",
    deadline: addDays(5),
    description: "Work as frontend developer using React and collaborate on impact-driven community products.",
    requirements: ["React", "HTML/CSS", "Team communication"],
    applyLink: "https://example.com/apply/frontend-developer",
    tags: ["React", "Frontend"]
  },
  {
    id: "2",
    title: "React Internship",
    organization: "Tech Academy",
    category: "Internship",
    location: "Online",
    type: "Remote",
    deadline: addDays(12),
    description: "Learn React and build projects with mentorship from experienced instructors.",
    requirements: ["Basic HTML/CSS", "Interest in React", "Internet access"],
    applyLink: "https://example.com/apply/react-internship",
    tags: ["React", "Internship"]
  },
  {
    id: "3",
    title: "Scholarship for Students",
    organization: "Global Education",
    category: "Scholarship",
    location: "Online",
    type: "Remote",
    deadline: addDays(45),
    description: "Full scholarship for online study covering software development and digital skills.",
    requirements: ["GPA 3.0+", "Motivation letter", "Open to remote learning"],
    applyLink: "https://example.com/apply/scholarship",
    tags: ["Scholarship", "Education"]
  },
  {
    id: "4",
    title: "UX Designer Contract",
    organization: "DesignWorks",
    category: "Remote work",
    location: "Herat",
    type: "On-site",
    deadline: addDays(8),
    description: "Short-term UX design contract for a civic project with local partners.",
    requirements: ["Figma", "User research", "Portfolio"],
    applyLink: "https://example.com/apply/ux-designer",
    tags: ["UX", "Design"]
  },
  {
    id: "5",
    title: "Data Science Bootcamp",
    organization: "Analytics Hub",
    category: "Advanced Training",
    location: "Online",
    type: "Remote",
    deadline: addDays(20),
    description: "Intensive bootcamp covering Python, ML, and data-driven storytelling.",
    requirements: ["Python basics", "Analytical mindset", "Project work"],
    applyLink: "https://example.com/apply/data-science-bootcamp",
    tags: ["Data", "Machine Learning"]
  },
  {
    id: "6",
    title: "Volunteer Community Organizer",
    organization: "Local NGO",
    category: "Volunteer work",
    location: "Mazar-i-Sharif",
    type: "On-site",
    deadline: addDays(3),
    description: "Coordinate community outreach, events, and volunteer training sessions.",
    requirements: ["Community engagement", "Event planning", "Local language"],
    applyLink: "https://example.com/apply/community-organizer",
    tags: ["Volunteer", "Community"]
  },
  {
    id: "7",
    title: "Mobile App Developer",
    organization: "Startup X",
    category: "Remote work",
    location: "Remote",
    type: "Remote",
    deadline: addDays(15),
    description: "Develop React Native features for a mobile app in a fast-paced startup environment.",
    requirements: ["React Native", "API integration", "Testing"],
    applyLink: "https://example.com/apply/mobile-app-developer",
    tags: ["Mobile", "React Native"]
  },
  {
    id: "8",
    title: "AI Product Manager Fellowship",
    organization: "Future Labs",
    category: "Professional Development",
    location: "Kabul",
    type: "Hybrid",
    deadline: addDays(38),
    description: "Apply to a fellowship combining AI product strategy, user research, and leadership training.",
    requirements: ["Product thinking", "AI knowledge", "Communication skills"],
    applyLink: "https://example.com/apply/ai-product-manager",
    tags: ["AI", "Product", "Fellowship"]
  },
  {
    id: "9",
    title: "Cybersecurity Specialist Program",
    organization: "SecureNet",
    category: "Advanced Training",
    location: "Online",
    type: "Remote",
    deadline: addDays(25),
    description: "Develop advanced cybersecurity skills with hands-on incident response labs.",
    requirements: ["Network basics", "Security fundamentals", "Problem solving"],
    applyLink: "https://example.com/apply/cybersecurity-program",
    tags: ["Cybersecurity", "Security", "Training"]
  },
  {
    id: "10",
    title: "Senior UX Research Role",
    organization: "UserFirst",
    category: "Job",
    location: "Kabul",
    type: "On-site",
    deadline: addDays(18),
    description: "Lead UX research for large-scale apps and mentor junior designers.",
    requirements: ["UX research", "Interviewing", "Storytelling"],
    applyLink: "https://example.com/apply/senior-ux-research",
    tags: ["UX", "Research", "Leadership"]
  },
  {
    id: "11",
    title: "Data Science Immersion",
    organization: "Insight Academy",
    category: "Advanced Training",
    location: "Online",
    type: "Remote",
    deadline: addDays(55),
    description: "Immersive bootcamp with project mentorship and portfolio review.",
    requirements: ["Data analysis", "Python", "Project experience"],
    applyLink: "https://example.com/apply/data-science-immersion",
    tags: ["Data", "ML", "Portfolio"]
  },
  {
    id: "12",
    title: "Blockchain Developer Fellowship",
    organization: "ChainForge",
    category: "Professional Development",
    location: "Remote",
    type: "Remote",
    deadline: addDays(42),
    description: "Work on blockchain infrastructure and smart contract development with expert mentors.",
    requirements: ["Solidity", "Smart contracts", "Blockchain fundamentals"],
    applyLink: "https://example.com/apply/blockchain-fellowship",
    tags: ["Blockchain", "Smart Contracts", "Fellowship"]
  },
  {
    id: "13",
    title: "Social Impact Innovation Lab",
    organization: "Impact Catalyst",
    category: "Volunteer work",
    location: "Herat",
    type: "On-site",
    deadline: addDays(10),
    description: "Join a collaborative lab building tech solutions for education and health.",
    requirements: ["Innovation", "Collaboration", "Community focus"],
    applyLink: "https://example.com/apply/innovation-lab",
    tags: ["Social Impact", "Innovation", "Volunteer"]
  },
  {
    id: "14",
    title: "Executive Leadership Scholarship",
    organization: "Global Leaders Fund",
    category: "Scholarship",
    location: "Online",
    type: "Remote",
    deadline: addDays(68),
    description: "Scholarship for senior professionals pursuing executive leadership training.",
    requirements: ["Leadership experience", "Letters of recommendation", "Motivation letter"],
    applyLink: "https://example.com/apply/leadership-scholarship",
    tags: ["Leadership", "Scholarship", "Executive"]
  }
];
