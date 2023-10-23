import {
  Text,
  Paper,
  List,
  Card,
  Group,
  Stack,
  Flex,
  Anchor,
} from "@mantine/core";
import { Resume } from "../interfaces";
import dayjs from "dayjs";
import { EmailField } from "@refinedev/mantine";

interface Props {
  resume: Resume;
}

const ResumeComponent = ({ resume }: Props) => {
  const {
    fullName,
    profile,
    contact,
    skills,
    education,
    experience,
    projects,
  } = resume;

  return (
    <Card>
      <Paper p="lg" withBorder>
        <Text weight={700} size="xl">
          {fullName}
        </Text>
        <Text size="sm">{profile}</Text>
      </Paper>
      <Paper p="lg" withBorder mt="md">
        <Text weight={700} size="xl">
          Contact Information
        </Text>
        <Stack>
          <Flex justify="start">
            <EmailField value={contact.email} style={{ flex: 1 }} size="sm" />
            <Text style={{ flex: 1 }} size="sm">
              <Anchor
                href={contact.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </Anchor>
            </Text>
          </Flex>
          <Flex justify="start">
            <Text style={{ flex: 1 }} size="sm">
              Phone: {contact.phoneNumber}
            </Text>
            <Text style={{ flex: 1 }} size="sm">
              Address: {contact.address} {contact.city}, {contact.country} -{" "}
              {contact.postCode}
            </Text>
          </Flex>
        </Stack>
      </Paper>
      {skills && skills.length != 0 && (
        <Paper p="xs" withBorder mt="md">
          <Text weight={700} size="xl">
            Skills
          </Text>
          <Group>
            {skills.map((skill) => (
              <span key={skill.id}>
                <Text size="sm">{skill.skill}</Text>
              </span>
            ))}
          </Group>
        </Paper>
      )}

      {education && education.length != 0 && (
        <Paper p="lg" withBorder mt="md">
          <Text weight={700} size="xl">
            Education
          </Text>
          <List>
            {education.map((edu) => (
              <Stack key={edu.id}>
                <Flex justify="start" align="center">
                  <Text fw={500} size="sm" style={{ flex: 1 }}>
                    {edu.schoolName}
                  </Text>
                  <Text size="sm" style={{ flex: 1 }}>
                    {dayjs(edu.startDate).format("MMMM D, YYYY")} -{" "}
                    {dayjs(edu.endDate).format("MMMM D, YYYY")}
                  </Text>
                </Flex>

                <Flex justify="start" align="center" key={edu.id} mb="xs">
                  <Text size="sm" style={{ flex: 1 }}>
                    {edu.degree}
                  </Text>
                  <Text size="sm" style={{ flex: 1 }}>
                    {edu.major}
                  </Text>
                </Flex>
              </Stack>
            ))}
          </List>
        </Paper>
      )}

      {experience && experience.length != 0 && (
        <Paper p="lg" withBorder mt="md">
          <Text weight={700} size="xl">
            Experience
          </Text>
          <List>
            {experience.map((exp) => (
              <List.Item key={exp.id}>
                <Flex justify="start" my="xs">
                  <Text style={{ flex: 1 }} fw={500} size="sm">
                    {exp.position} · {exp.companyName}
                  </Text>

                  <Text style={{ flex: 1 }} size="sm">
                    {dayjs(exp.startDate).format("MMMM D, YYYY")} -{" "}
                    {dayjs(exp.endDate).format("MMMM D, YYYY")}
                  </Text>
                </Flex>
                <Text
                  style={{ whiteSpace: "pre-wrap" }}
                  size="sm"
                  inline={false}
                >
                  {exp.description}
                </Text>
                <Text size="sm">Location: {exp.location}</Text>
              </List.Item>
            ))}
          </List>
        </Paper>
      )}
      {projects && projects.length != 0 && (
        <Paper p="lg" withBorder mt="md">
          <Text weight={700} size="xl">
            Projects
          </Text>
          <List>
            {projects.map((project) => (
              <List.Item key={project.id}>
                <Flex align="center" justify="space-between">
                  <Text fw={500} style={{ flex: 1 }} size="sm" my="xs">
                    {project.name}
                  </Text>
                  <Text style={{ flex: 1 }} size="sm">
                    {dayjs(project.startDate).format("MMMM D, YYYY")} -{" "}
                    {dayjs(project.endDate).format("MMMM D, YYYY")}
                  </Text>
                </Flex>

                <Text
                  style={{ whiteSpace: "pre-wrap" }}
                  size="sm"
                  inline={false}
                >
                  {project.description}
                </Text>
              </List.Item>
            ))}
          </List>
        </Paper>
      )}
    </Card>
  );
};

export default ResumeComponent;
