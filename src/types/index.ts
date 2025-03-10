// Resume data types
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  title: string;
  duration: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  startDate: string;
  endDate: string;
  name: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
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
  summary: string;
  roles: Role[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  achievements: Achievement[];
  skills: string[];
  languages: string[];
} 