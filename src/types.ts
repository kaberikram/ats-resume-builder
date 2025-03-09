export interface Experience {
  id: string;
  company: string;
  title: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  duration: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  roles: { id: string; title: string }[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  achievements: Achievement[];
  skills: string[];
  languages: string[];
} 