export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  duration: string;
  description: string;
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
  experience: Experience[];
  education: Education[];
  projects: Project[];
  achievements: Achievement[];
  skills: string[];
} 