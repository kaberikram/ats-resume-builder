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
  title?: string;
  description: string;
  technologies?: string[];
  link?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface Role {
  id: string;
  title: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  roles: Role[];
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  achievements: Achievement[];
  skills: string[];
  languages: string[];
} 