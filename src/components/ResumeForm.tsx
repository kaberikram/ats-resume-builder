import { useState } from 'react';
import { ResumeData, Experience, Education, Project, Achievement, Role, CustomEntry } from '@/types/index';
import ImageCropper from './ImageCropper';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string>('');

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
          location: '',
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
          location: '',
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
          description: ''
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setTempImageSrc(result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    updateField('profileImage', croppedImageUrl);
    setShowCropper(false);
    setTempImageSrc('');
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setTempImageSrc('');
  };

  const removeImage = () => {
    updateField('profileImage', undefined);
  };

  // Helper to update section titles
  const defaultSectionTitles = {
    summary: 'Professional Summary',
    experience: 'Experience',
    education: 'Education',
    achievements: 'Achievements',
    projects: 'Key Projects',
    skills: 'Skills',
    languages: 'Languages',
  };
  const sectionTitles = { ...defaultSectionTitles, ...data.sectionTitles };

  const updateSectionTitle = (key: keyof typeof sectionTitles, value: string) => {
    onChange({
      ...data,
      sectionTitles: {
        ...sectionTitles,
        [key]: value,
      },
    });
  };

  const defaultVisibleSections = {
    summary: true,
    experience: true,
    education: true,
    achievements: true,
    projects: true,
    skills: true,
    languages: true,
  };
  const visibleSections = { ...defaultVisibleSections, ...data.visibleSections };

  const toggleSectionVisibility = (section: keyof typeof defaultVisibleSections) => {
    onChange({
      ...data,
      visibleSections: {
        ...defaultVisibleSections,
        ...data.visibleSections,
        [section]: !(data.visibleSections?.[section] ?? true),
      },
    });
  };

  const addCustomSection = () => {
    const newId = Date.now().toString();
    onChange({
      ...data,
      customSections: [
        ...(data.customSections || []),
        { id: newId, title: 'New Section', type: '', entries: [] },
      ],
    });
  };

  const updateCustomSection = (id: string, field: 'title' | 'type' | 'entries' | 'content', value: any) => {
    onChange({
      ...data,
      customSections: data.customSections?.map(sec =>
        sec.id === id ? { ...sec, [field]: value } : sec
      ),
    });
  };

  const addCustomEntry = (sectionId: string) => {
    const entryId = Date.now().toString();
    onChange({
      ...data,
      customSections: data.customSections?.map(sec =>
        sec.id === sectionId
          ? { ...sec, entries: [...(sec.entries || []), { id: entryId, title: '', organization: '', date: '', location: '', description: '' }] }
          : sec
      ),
    });
  };

  const updateCustomEntry = (sectionId: string, entryId: string, field: keyof CustomEntry, value: string) => {
    onChange({
      ...data,
      customSections: data.customSections?.map(sec =>
        sec.id === sectionId
          ? { ...sec, entries: (sec.entries || []).map(e => e.id === entryId ? { ...e, [field]: value } : e) }
          : sec
      ),
    });
  };

  const deleteCustomEntry = (sectionId: string, entryId: string) => {
    onChange({
      ...data,
      customSections: data.customSections?.map(sec =>
        sec.id === sectionId
          ? { ...sec, entries: (sec.entries || []).filter(e => e.id !== entryId) }
          : sec
      ),
    });
  };

  const deleteCustomSection = (id: string) => {
    onChange({
      ...data,
      customSections: data.customSections?.filter(sec => sec.id !== id),
    });
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 max-w-3xl mx-auto">
      {showCropper && (
        <ImageCropper
          src={tempImageSrc}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
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
            <label className="text-sm font-medium">Profile Picture (optional)</label>
            {data.profileImage ? (
              <div className="flex items-center gap-4">
                <img 
                  src={data.profileImage} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover border border-neutral-200 dark:border-neutral-800"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="px-3 py-1.5 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-neutral-50 file:text-neutral-700 hover:file:bg-neutral-100"
              />
            )}
          </div>
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
          <input
            type="text"
            placeholder="LinkedIn or Portfolio URL (optional)"
            value={data.linkedin || ''}
            onChange={(e) => updateField('linkedin', e.target.value)}
            className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <input
              type="text"
              value={sectionTitles.summary}
              onChange={e => updateSectionTitle('summary', e.target.value)}
              className="bg-transparent font-semibold text-xl w-auto flex-1 focus:outline-none border-b border-dashed border-neutral-300 dark:border-neutral-700"
              style={{ minWidth: 120 }}
            />
          </h2>
          <button
            type="button"
            onClick={() => toggleSectionVisibility('summary')}
            className="text-xs px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 ml-2"
          >
            {visibleSections.summary === false ? 'Show' : 'Hide'} Section
          </button>
        </div>
        {visibleSections.summary && (
          <textarea
            placeholder="Write a compelling summary of your professional background, key strengths, and career objectives..."
            value={data.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent min-h-[8rem]"
          />
        )}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <input
              type="text"
              value={sectionTitles.experience}
              onChange={e => updateSectionTitle('experience', e.target.value)}
              className="bg-transparent font-semibold text-xl w-auto flex-1 focus:outline-none border-b border-dashed border-neutral-300 dark:border-neutral-700"
              style={{ minWidth: 120 }}
            />
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
              placeholder="Location"
              value={exp.location}
              onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
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
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <input
              type="text"
              value={sectionTitles.education}
              onChange={e => updateSectionTitle('education', e.target.value)}
              className="bg-transparent font-semibold text-xl w-auto flex-1 focus:outline-none border-b border-dashed border-neutral-300 dark:border-neutral-700"
              style={{ minWidth: 120 }}
            />
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
              placeholder="Location"
              value={edu.location}
              onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
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
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <input
              type="text"
              value={sectionTitles.achievements}
              onChange={e => updateSectionTitle('achievements', e.target.value)}
              className="bg-transparent font-semibold text-xl w-auto flex-1 focus:outline-none border-b border-dashed border-neutral-300 dark:border-neutral-700"
              style={{ minWidth: 120 }}
            />
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
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <input
              type="text"
              value={sectionTitles.projects}
              onChange={e => updateSectionTitle('projects', e.target.value)}
              className="bg-transparent font-semibold text-xl w-auto flex-1 focus:outline-none border-b border-dashed border-neutral-300 dark:border-neutral-700"
              style={{ minWidth: 120 }}
            />
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
              className="w-full p-3 rounded-lg mb-2 border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent"
            />
            <textarea
              placeholder="Project Description"
              value={proj.description}
              onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
              className="w-full p-3 rounded-lg mb-2 border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent h-32"
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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <input
              type="text"
              value={sectionTitles.skills}
              onChange={e => updateSectionTitle('skills', e.target.value)}
              className="bg-transparent font-semibold text-xl w-auto flex-1 focus:outline-none border-b border-dashed border-neutral-300 dark:border-neutral-700"
              style={{ minWidth: 120 }}
            />
          </h2>
          <button
            type="button"
            onClick={() => toggleSectionVisibility('skills')}
            className="text-xs px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 ml-2"
          >
            {visibleSections.skills === false ? 'Show' : 'Hide'} Section
          </button>
        </div>
        {visibleSections.skills && (
          <textarea
            placeholder="Enter skills separated by commas"
            value={data.skills.join(', ')}
            onChange={(e) => updateSkills(e.target.value)}
            className="w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent min-h-[8rem]"
          />
        )}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <input
              type="text"
              value={sectionTitles.languages}
              onChange={e => updateSectionTitle('languages', e.target.value)}
              className="bg-transparent font-semibold text-xl w-auto flex-1 focus:outline-none border-b border-dashed border-neutral-300 dark:border-neutral-700"
              style={{ minWidth: 120 }}
            />
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

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Custom Sections</h2>
          <button
            type="button"
            onClick={addCustomSection}
            className="px-3 py-1.5 text-sm rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"
          >
            Add Custom Section
          </button>
        </div>
        {data.customSections?.map(sec => (
          <div key={sec.id} className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={sec.title}
                onChange={e => updateCustomSection(sec.id, 'title', e.target.value)}
                placeholder="Section Title"
                className="w-full p-2 font-semibold text-lg border-b border-dashed border-neutral-300 dark:border-neutral-700 bg-transparent"
              />
              <button
                type="button"
                onClick={() => deleteCustomSection(sec.id)}
                className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800"
              >
                Delete
              </button>
            </div>
            <select
              value={sec.type || ''}
              onChange={e => updateCustomSection(sec.id, 'type', e.target.value)}
              className="w-full p-2 mb-2 border border-neutral-200 dark:border-neutral-800 rounded bg-white text-black dark:bg-neutral-900 dark:text-white"
            >
              <option value="" disabled>Select Section Type…</option>
              <option value="entry">Entry-based (like Experience/Education)</option>
              <option value="text">Text-based (like Skills/Summary)</option>
            </select>
            {sec.type === 'entry' ? (
              <div>
                {(sec.entries || []).map(entry => (
                  <div key={entry.id} className="mb-4 p-3 border rounded">
                    <input
                      type="text"
                      value={entry.title}
                      onChange={e => updateCustomEntry(sec.id, entry.id, 'title', e.target.value)}
                      placeholder="Title/Position"
                      className="w-full p-2 mb-2"
                    />
                    <input
                      type="text"
                      value={entry.organization}
                      onChange={e => updateCustomEntry(sec.id, entry.id, 'organization', e.target.value)}
                      placeholder="Organization/Company/School"
                      className="w-full p-2 mb-2"
                    />
                    <input
                      type="text"
                      value={entry.location}
                      onChange={e => updateCustomEntry(sec.id, entry.id, 'location', e.target.value)}
                      placeholder="Location"
                      className="w-full p-2 mb-2"
                    />
                    <input
                      type="text"
                      value={entry.date}
                      onChange={e => updateCustomEntry(sec.id, entry.id, 'date', e.target.value)}
                      placeholder="Date/Duration"
                      className="w-full p-2 mb-2"
                    />
                    <textarea
                      value={entry.description}
                      onChange={e => updateCustomEntry(sec.id, entry.id, 'description', e.target.value)}
                      placeholder="Description"
                      className="w-full p-2 mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => deleteCustomEntry(sec.id, entry.id)}
                      className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800"
                    >
                      Remove Entry
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addCustomEntry(sec.id)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"
                >
                  Add Entry
                </button>
              </div>
            ) : (
              <textarea
                value={sec.content?.[0] || ''}
                onChange={e => updateCustomSection(sec.id, 'content', [e.target.value])}
                placeholder="Section Content"
                className="w-full p-2 h-24 border border-neutral-200 dark:border-neutral-800 rounded"
              />
            )}
          </div>
        ))}
      </section>
    </div>
  );
} 