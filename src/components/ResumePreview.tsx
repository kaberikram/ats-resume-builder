import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData, Experience, Education, Project, Achievement } from '@/types';

interface ResumePreviewProps {
  data: ResumeData;
  theme: 'light' | 'dark';
}

// Function to split description into bullet points
const getBulletPoints = (text: string): string[] => {
  return text.split('\n').filter(point => point.trim() !== '');
};

const ResumeDocument = ({ data, theme, styles }: { data: ResumeData; theme: 'light' | 'dark'; styles: any }) => (
  <Document title={`${data.name}'s Resume`} author={data.name}>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.title}>
          {data.roles.map(role => role.title).join(' | ')}
        </Text>
        <View style={styles.contactInfo}>
          <Text>{data.phone}</Text>
          <Text>{data.email}</Text>
          <Text>{data.location}</Text>
        </View>
      </View>

      {/* Professional Summary */}
      {data.experience[0]?.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.description}>{data.experience[0].description}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp: Experience) => (
            <View key={exp.id} style={styles.experienceItem}>
              <View style={styles.companyHeader}>
                <View style={styles.company}>
                  <Text style={styles.companyName}>{exp.company}</Text>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                </View>
                <Text style={styles.duration}>{exp.duration}</Text>
              </View>
              {getBulletPoints(exp.description).map((point, index) => (
                <View key={index} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.description}>{point}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Key Projects */}
      {data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          {data.projects.map((proj: Project) => (
            <View key={proj.id} style={styles.experienceItem}>
              <Text style={styles.projectTitle}>{proj.title || proj.name}</Text>
              <Text style={styles.description}>{proj.description}</Text>
              {proj.technologies && proj.technologies.length > 0 && (
                <Text style={styles.description}>
                  Technologies: {proj.technologies.join(', ')}
                </Text>
              )}
              {proj.link && (
                <Text style={styles.description}>Link: {proj.link}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {data.achievements.map((achievement: Achievement) => (
            <View key={achievement.id} style={styles.experienceItem}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.description}>{achievement.description}</Text>
              {achievement.date && (
                <Text style={styles.duration}>{achievement.date}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <View wrap={false} style={styles.educationSection}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu: Education) => (
            <View wrap={false} key={edu.id} style={styles.educationItem}>
              <View style={styles.companyHeader}>
                <Text style={styles.companyName}>{edu.school}</Text>
                <Text style={styles.duration}>{edu.duration}</Text>
              </View>
              <Text style={styles.degree}>{edu.degree}</Text>
              {edu.description && (
                <View wrap={false}>
                  <Text style={styles.educationDescription}>{edu.description}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.skills}>
            {data.languages.map((language: string, index: number) => (
              <Text key={language}>
                {language}
                {index < data.languages.length - 1 && (
                  <Text style={styles.separator}> • </Text>
                )}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skills}>
            {data.skills.map((skill, index) => (
              <Text key={skill}>
                {skill}
                {index < data.skills.length - 1 && (
                  <Text style={styles.separator}> • </Text>
                )}
              </Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default function ResumePreview({ data, theme }: ResumePreviewProps) {
  // Format the current date as YYYY-MM-DD
  const formattedDate = new Date().toISOString().split('T')[0];
  
  // Create a filename from the user's name and date
  const fileName = `${data.name.toLowerCase().replace(/\s+/g, '-')}-resume-${formattedDate}.pdf`;

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
      color: theme === 'light' ? '#000000' : '#ffffff',
      fontFamily: 'Helvetica',
      fontSize: 11,
    },
    header: {
      textAlign: 'center',
      marginBottom: 15,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 4,
    },
    title: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 8,
      color: theme === 'light' ? '#666666' : '#999999',
    },
    contactInfo: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      fontSize: 10,
      color: theme === 'light' ? '#333333' : '#cccccc',
    },
    section: {
      marginTop: 12,
      breakInside: 'avoid',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      marginTop: 16,
      borderBottom: `1px solid ${theme === 'light' ? '#000000' : '#ffffff'}`,
      paddingBottom: 4,
    },
    educationSection: {
      marginTop: 12,
      breakInside: 'avoid',
      pageBreakInside: 'avoid',
      breakBefore: 'avoid',
      breakAfter: 'avoid',
      display: 'flex',
      flexDirection: 'column',
    },
    experienceItem: {
      marginBottom: 10,
    },
    educationItem: {
      marginBottom: 8,
      breakInside: 'avoid',
      pageBreakInside: 'avoid',
      breakBefore: 'avoid',
      breakAfter: 'avoid',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    },
    companyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 2,
    },
    company: {
      flex: 1,
    },
    companyName: {
      fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 1,
    },
    jobTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: theme === 'light' ? '#333333' : '#cccccc',
    },
    projectTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 4,
      color: theme === 'light' ? '#000000' : '#ffffff',
    },
    achievementTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 4,
      color: theme === 'light' ? '#000000' : '#ffffff',
    },
    duration: {
      fontSize: 11,
      color: theme === 'light' ? '#666666' : '#999999',
      textAlign: 'right',
      marginLeft: 10,
    },
    description: {
      fontSize: 11,
      lineHeight: 1.4,
      marginTop: 2,
      color: theme === 'light' ? '#444444' : '#bbbbbb',
    },
    educationDescription: {
      fontSize: 11,
      lineHeight: 1.4,
      marginTop: 2,
      color: theme === 'light' ? '#444444' : '#bbbbbb',
      breakInside: 'avoid',
      pageBreakInside: 'avoid',
    },
    degree: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 2,
      marginTop: 0,
    },
    skills: {
      fontSize: 11,
      lineHeight: 1.6,
      marginTop: 6,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    skillItem: {
      marginRight: 4,
      marginBottom: 4,
    },
    separator: {
      marginHorizontal: 6,
      color: theme === 'light' ? '#666666' : '#999999',
    },
    bulletPoint: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    bullet: {
      marginRight: 5,
      fontSize: 11,
      fontWeight: 'bold',
    },
    skillsSection: {
      marginTop: 12,
      breakBefore: 'page',
    },
  });

  return (
    <div className="relative flex flex-col h-full">
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end">
        <PDFDownloadLink
          document={<ResumeDocument data={data} theme={theme} styles={styles} />}
          fileName={fileName}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
            bg-neutral-900 dark:bg-white text-white dark:text-neutral-900
            hover:bg-neutral-800 dark:hover:bg-neutral-100
            rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Save with proper name
        </PDFDownloadLink>
        <span className="text-xs text-neutral-500 mt-1 mr-1">
          Will save as: {fileName}
        </span>
      </div>
      <PDFViewer className="w-full h-full rounded-lg">
        <ResumeDocument data={data} theme={theme} styles={styles} />
      </PDFViewer>
    </div>
  );
} 