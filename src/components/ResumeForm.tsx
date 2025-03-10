import { useState } from 'react';
import { ResumeData, Experience, Education, Project, Achievement, Role } from '@/types/index';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const updateField = (field: keyof ResumeData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const addRole = () => {
    onChange({
      ...data,
      roles: [
        ...data.roles,
        {
          id: Date.now().toString(),
          title: '',
        },
      ],
    });
  };

  const updateRole = (id: string, value: string) => {
    onChange({
      ...data,
      roles: data.roles.map((role) =>
        role.id === id ? { ...role, title: value } : role
      ),
    });
  };

  const removeRole = (id: string) => {
    onChange({
      ...data,
      roles: data.roles.filter((role) => role.id !== id),
    });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: Date.now().toString(),
          title: '',
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          duration: '',
          description: '',
        },
      ],
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now().toString(),
          degree: '',
          school: '',
          field: '',
          graduationDate: '',
          duration: '',
          description: '',
        },
      ],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const updateSkills = (skillsString: string) => {
    onChange({
      ...data,
      skills: skillsString.split(',').map((skill) => skill.trim()),
    });
  };

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        {
          id: Date.now().toString(),
          name: '',
          title: '',
          description: '',
          technologies: [],
          startDate: '',
          endDate: '',
        },
      ],
    });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  const addLanguage = () => {
    onChange({
      ...data,
      languages: [...data.languages, '']
    });
  };

  const updateLanguage = (index: number, value: string) => {
    const newLanguages = [...data.languages];
    newLanguages[index] = value;
    onChange({
      ...data,
      languages: newLanguages
    });
  };

  const removeLanguage = (index: number) => {
    onChange({
      ...data,
      languages: data.languages.filter((_, i) => i !== index)
    });
  };

  const addAchievement = () => {
    const newId = String(data.achievements.length + 1);
    onChange({
      ...data,
      achievements: [...data.achievements, { 
        id: newId, 
        title: '', 
        description: '',
        date: ''
      }]
    });
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    onChange({
      ...data,
      achievements: data.achievements.map(achievement =>
        achievement.id === id ? { ...achievement, [field]: value } : achievement
      )
    });
  };

  const removeAchievement = (id: string) => {
    onChange({
      ...data,
      achievements: data.achievements.filter(achievement => achievement.id !== id)
    });
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 max-w-3xl mx-auto">
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Personal Information
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={data.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Professional Roles</label>
              <button
                onClick={addRole}
                className="px-3 py-1.5 text-sm rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"
              >
                Add Role
              </button>
            </div>
            {data.roles.map((role, index) => (
              <div key={role.id} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Role (e.g., AR/VR Developer)"
                  value={role.title}
                  onChange={(e) => updateRole(role.id, e.target.value)}
                  className="flex-1 p-3 rounded-lg"
                />
                <button
                  onClick={() => removeRole(role.id)}
                  className="px-2 py-1 text-sm rounded-lg bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={data.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Location"
            value={data.location}
            onChange={(e) => updateField('location', e.target.value)}
            className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Professional Summary
        </h2>
        <textarea
          placeholder="Write a compelling summary of your professional background, key strengths, and career objectives..."
          value={data.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent min-h-[8rem]"
        />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Experience
          </h2>
          <button 
            onClick={addExperience} 
            className="px-3 py-1.5 text-sm rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"
          >
            Add Experience
          </button>
        </div>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-6 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              className="w-full p-3 rounded-lg mb-2"
            />
            <input
              type="text"
              placeholder="Title"
              value={exp.title}
              onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
              className="w-full p-3 rounded-lg mb-2"
            />
            <input
              type="text"
              placeholder="Duration (e.g., Jan 2020 - Present)"
              value={exp.duration}
              onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
              className="w-full p-3 rounded-lg mb-2"
            />
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              className="w-full p-3 rounded-lg h-32"
            />
            <button
              type="button"
              onClick={() => {
                onChange({
                  ...data,
                  experience: data.experience.filter((e) => e.id !== exp.id),
                });
              }}
              className="mt-2 px-3 py-1.5 text-sm rounded-lg bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
            >
              Remove Experience
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Education
          </h2>
          <button 
            onClick={addEducation} 
            className="px-3 py-1.5 text-sm rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"
          >
            Add Education
          </button>
        </div>
        {data.education.map((edu) => (
          <div key={edu.id} className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <input
              type="text"
              placeholder="School"
              value={edu.school}
              onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
              className="w-full p-3 rounded-lg mb-2 border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              className="w-full p-3 rounded-lg mb-2 border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Duration (e.g., 2016 - 2020)"
              value={edu.duration}
              onChange={(e) => updateEducation(edu.id, 'duration', e.target.value)}
              className="w-full p-3 rounded-lg mb-2 border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
            />
            <textarea
              placeholder="Description (e.g., CGPA, achievements, activities)"
              value={edu.description}
              onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
              className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent h-32"
            />
            <button
              type="button"
              onClick={() => {
                onChange({
                  ...data,
                  education: data.education.filter((e) => e.id !== edu.id),
                });
              }}
              className="mt-2 px-3 py-1.5 text-sm rounded-lg bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
            >
              Remove Education
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Achievements
          </h2>
          <button
            type="button"
            onClick={addAchievement}
            className="px-3 py-1.5 text-sm rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"
          >
            Add Achievement
          </button>
        </div>
        {data.achievements.map((achievement) => (
          <div key={achievement.id} className="mb-6 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <input
              type="text"
              value={achievement.title}
              onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
              placeholder="Achievement Title"
              className="w-full p-3 rounded-lg mb-2 border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
            />
            <textarea
              value={achievement.description}
              onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
              placeholder="Achievement Description"
              className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent h-32"
            />
            <button
              type="button"
              onClick={() => removeAchievement(achievement.id)}
              className="mt-2 px-3 py-1.5 text-sm rounded-lg bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
            >
              Remove Achievement
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Key Projects
          </h2>
          <button 
            onClick={addProject} 
            className="px-3 py-1.5 text-sm rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"
          >
            Add Project
          </button>
        </div>
        {data.projects.map((proj) => (
          <div key={proj.id} className="mb-6 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <input
              type="text"
              placeholder="Project Name"
              value={proj.name}
              onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
              className="w-full p-3 rounded-lg mb-2"
            />
            <textarea
              placeholder="Project Description"
              value={proj.description}
              onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
              className="w-full p-3 rounded-lg h-32"
            />
            <button
              type="button"
              onClick={() => {
                onChange({
                  ...data,
                  projects: data.projects.filter((p) => p.id !== proj.id),
                });
              }}
              className="mt-2 px-3 py-1.5 text-sm rounded-lg bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
            >
              Remove Project
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Skills
        </h2>
        <textarea
          placeholder="Enter skills separated by commas"
          value={data.skills.join(', ')}
          onChange={(e) => updateSkills(e.target.value)}
          className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent min-h-[8rem]"
        />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Languages
          </h2>
          <button
            type="button"
            onClick={addLanguage}
            className="px-3 py-1.5 text-sm rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"
          >
            Add Language
          </button>
        </div>
        <div className="space-y-4">
          {data.languages.map((language, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={language}
                onChange={(e) => updateLanguage(index, e.target.value)}
                placeholder="Language (e.g., English (Native))"
                className="flex-1 px-3 py-2 rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeLanguage(index)}
                className="px-2 py-1 text-sm rounded-lg bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 