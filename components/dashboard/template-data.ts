export interface Template {
  id: string;
  name: string;
  description: string;
  industry: string;
  thumbnail: string;
  popular?: boolean;
  role?: string;
  experience?: string;
  company?: string;
  location?: string;
}

export const TEMPLATES: Template[] = [
  {
    id: "69205909d2a3846e1ea37870",
    name: "Modern Professional",
    description: "A clean, balanced layout perfect for corporate and tech roles.",
    industry: "Technology",
    thumbnail: "/templates/template-1.png",
    popular: true,
    role: "Software Dev",
    experience: "Entry Level",
    company: "Google",
  },
  {
    id: "template-creative-1",
    name: "Creative Vanguard",
    description: "Bold typography and unique spatial composition for designers.",
    industry: "Design",
    thumbnail: "/templates/creative-1.png",
    role: "Frontend",
    experience: "Mid Level",
    company: "Startup",
  },
  {
    id: "template-minimal-1",
    name: "Sleek Minimalist",
    description: "Focus on white space and essential details. High clarity.",
    industry: "Management",
    thumbnail: "/templates/minimal-1.png",
    role: "Management",
    experience: "Senior",
    company: "Meta",
  },
  {
    id: "template-executive-1",
    name: "Executive Suite",
    description: "Sophisticated and authoritative, designed for senior roles.",
    industry: "Executive",
    thumbnail: "/templates/executive-1.png",
    popular: true,
    role: "Fullstack",
    experience: "Executive",
    company: "Amazon",
  },
  {
    id: "template-professional-2",
    name: "Academic Precision",
    description: "Optimized for long-form content and publications.",
    industry: "Education",
    thumbnail: "/templates/academic-1.png",
    role: "Software Dev",
    experience: "Mid Level",
    company: "Microsoft",
  },
];
