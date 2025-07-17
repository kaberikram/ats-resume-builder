// Resume data types
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
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
  location: string;
  graduationDate: string;
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
  date: string;
}

export interface Role {
  id: string;
  title: string;
}

export interface SectionTitles {
  summary: string;
  experience: string;
  education: string;
  achievements: string;
  projects: string;
  skills: string;
  languages: string;
}

export interface CustomEntry {
  id: string;
  title: string;
  organization?: string;
  date?: string;
  location?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  type: '' | 'entry' | 'text';
  entries?: CustomEntry[]; // For entry-based
  content?: string[];      // For text-based
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  profileImage?: string;
  summary: string;
  roles: Role[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  achievements: Achievement[];
  skills: string[];
  languages: string[];
  sectionTitles?: SectionTitles;
  visibleSections?: {
    summary: boolean;
    experience: boolean;
    education: boolean;
    achievements: boolean;
    projects: boolean;
    skills: boolean;
    languages: boolean;
  };
  customSections?: CustomSection[];
} 