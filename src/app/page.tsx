'use client';

import { useState } from 'react';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import { ResumeData } from '@/types/index';

const sampleProfile: ResumeData = {
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  phone: '+60 12-345 6789',
  location: 'Kuala Lumpur, Malaysia',
  linkedin: 'https://linkedin.com/in/johndoe',
  roles: [
    { id: '1', title: 'Digital Marketing Manager' },
    { id: '2', title: 'Social Media Strategist' }
  ],
  summary: 'Results-driven Digital Marketing Manager with 5+ years of experience in developing and executing comprehensive marketing strategies. Proven track record of increasing brand visibility, engagement, and ROI through data-driven campaigns and innovative social media initiatives. Skilled in leading cross-functional teams and adapting to rapidly evolving digital landscapes.',
  experience: [
    {
      id: '1',
      company: 'Media Prima Digital',
      position: 'Senior Digital Marketing Manager',
      location: 'Kuala Lumpur, Malaysia',
      title: 'Senior Digital Marketing Manager',
      startDate: 'June 2021',
      endDate: 'Present',
      duration: 'June 2021 - Present',
      description: 'Developed and executed comprehensive digital marketing strategies for major Malaysian media brands\nLed and mentored a team of 5 content creators, driving 300% increase in social media engagement\nSpearheaded viral marketing campaigns achieving 5M+ impressions across Southeast Asia\nImplemented data-driven marketing strategies resulting in 150% ROI for advertising clients\nOptimized social media content using SEO best practices and analytics tools',
    }
  ],
  education: [
    {
      id: '1',
      school: 'Universiti Malaya',
      degree: 'Bachelor of Business Administration',
      field: 'Marketing',
      location: 'Kuala Lumpur, Malaysia',
      graduationDate: 'May 2021',
      duration: 'August 2017 - May 2021',
      description: 'CGPA: 3.8/4.0\nVice President of Marketing Society',
    }
  ],
  projects: [
    {
      id: '1',
      name: 'Ramadan & Raya Digital Marketing Campaign 2023',
      description: 'Led end-to-end digital marketing strategy for nationwide festive campaign. Utilized multi-channel approach including social media, influencer partnerships, and paid advertising. Achieved 2M+ impressions and 400% increase in brand engagement metrics.'
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Digital Marketing Excellence Award - Malaysia 2022',
      description: 'Gold award recipient for Best Integrated Social Media Campaign, recognized for innovative digital marketing strategies and measurable business impact.',
      date: 'November 2022'
    }
  ],
  skills: [
    'Digital Marketing Strategy',
    'Social Media Marketing',
    'Content Strategy',
    'Campaign Management',
    'Marketing Analytics',
    'SEO/SEM',
    'Performance Marketing',
    'Brand Development',
    'Team Leadership',
    'Adobe Creative Suite',
    'Google Analytics',
    'Meta Ads Manager'
  ],
  languages: [
    'English (Professional)',
    'Bahasa Malaysia (Native)',
    'Mandarin (Conversational)'
  ],
  sectionTitles: {
    summary: 'Professional Summary',
    experience: 'Experience',
    education: 'Education',
    achievements: 'Achievements',
    projects: 'Key Projects',
    skills: 'Skills',
    languages: 'Languages',
  },
  visibleSections: {
    summary: true,
    experience: true,
    education: true,
    achievements: true,
    projects: true,
    skills: true,
    languages: true,
  },
  customSections: [],
};

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(sampleProfile);
  const [pdfTheme, setPdfTheme] = useState<'light' | 'dark'>('light');

  const handleResumeChange = (data: ResumeData) => {
    setResumeData(data);
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Resume Builder
            </h1>
            <div className="theme-switcher">
              <button
                onClick={() => setPdfTheme('light')}
                className={`theme-button theme-button-light ${pdfTheme === 'light' ? 'active' : ''}`}
                aria-label="Light theme"
              />
              <button
                onClick={() => setPdfTheme('dark')}
                className={`theme-button theme-button-dark ${pdfTheme === 'dark' ? 'active' : ''}`}
                aria-label="Dark theme"
              />
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 italic">
            Built by <a href="https://x.com/Kaberikram" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 dark:hover:text-gray-300">Ikram Hakim (@Kaberikram)</a>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-8xl mx-auto">
          <div className="bg-white dark:bg-black rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <ResumeForm data={resumeData} onChange={handleResumeChange} />
          </div>
          <div className="flex flex-col">
            <div className="pdf-viewer-container">
              <ResumePreview data={resumeData} theme={pdfTheme} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
