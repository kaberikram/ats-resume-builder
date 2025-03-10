import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData, Experience, Education, Project, Achievement } from '@/types';

// Function to split description into bullet points
const getBulletPoints = (text: string): string[] => {
  return text.split('\n').filter(point => point.trim() !== '');
};

interface ResumeDocumentProps {
  data: ResumeData;
  theme: 'light' | 'dark';
}

export default function ResumeDocument({ data, theme }: ResumeDocumentProps) {
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
    experienceItem: {
      marginBottom: 10,
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
    skills: {
      fontSize: 11,
      lineHeight: 1.6,
      marginTop: 6,
      flexDirection: 'row',
      flexWrap: 'wrap',
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
  });

  return (
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

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>{data.summary}</Text>
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

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu: Education) => (
              <View key={edu.id} style={styles.experienceItem}>
                <View style={styles.companyHeader}>
                  <Text style={styles.companyName}>{edu.school}</Text>
                  <Text style={styles.duration}>{edu.duration}</Text>
                </View>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
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
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {data.projects.map((proj: Project) => (
              <View key={proj.id} style={styles.experienceItem}>
                <Text style={styles.projectTitle}>{proj.name}</Text>
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

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
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
      </Page>
    </Document>
  );
} 