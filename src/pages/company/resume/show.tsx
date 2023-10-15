import React from "react";
import { Text, Paper, List, Card, Group } from "@mantine/core";
import { Resume } from "../../../interfaces";
import dayjs from "dayjs";

interface Props {
  resume: Resume;
}

const ResumeShow = ({ resume }: Props) => {
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
      <Paper p="xs" withBorder>
        <Text weight={700} size="xl">
          {fullName}
        </Text>
        <Text size="sm">{profile}</Text>
      </Paper>
      <Paper p="xs" withBorder mt="md">
        <Text weight={700} size="xl">
          Contact Information
        </Text>
        <List>
          <List.Item>
            <Text size="sm">Phone: {contact.phoneNumber}</Text>
          </List.Item>
          <List.Item>
            <Text size="sm">Email: {contact.email}</Text>
          </List.Item>
          <List.Item>
            <Text size="sm">Address: {contact.address}</Text>
          </List.Item>
          <List.Item>
            <Text size="sm">
              {contact.city}, {contact.country} - {contact.postCode}
            </Text>
          </List.Item>
          <List.Item>
            <a
              href={contact.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Profile
            </a>
          </List.Item>
        </List>
      </Paper>

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

      <Paper p="xs" withBorder mt="md">
        <Text weight={700} size="xl">
          Education
        </Text>
        <List>
          {education.map((edu) => (
            <List.Item key={edu.id}>
              <Text size="sm">
                {edu.degree} in {edu.major} at {edu.schoolName}
              </Text>
              <Text size="sm">
                {dayjs(edu.startDate).format("MMMM D, YYYY")} -{" "}
                {dayjs(edu.endDate).format("MMMM D, YYYY")}
              </Text>
            </List.Item>
          ))}
        </List>
      </Paper>

      <Paper p="xs" withBorder mt="md">
        <Text weight={700} size="xl">
          Experience
        </Text>
        <List>
          {experience.map((exp) => (
            <List.Item key={exp.id}>
              <Text size="sm">{exp.position}</Text>
              <Text size="sm">{exp.companyName}</Text>
              <Text size="sm">
                {dayjs(exp.startDate).format("MMMM D, YYYY")} -{" "}
                {dayjs(exp.endDate).format("MMMM D, YYYY")}
              </Text>
              <Text size="sm">{exp.description}</Text>
              <Text size="sm">{exp.location}</Text>
            </List.Item>
          ))}
        </List>
      </Paper>

      <Paper p="xs" withBorder mt="md">
        <Text weight={700} size="xl">
          Projects
        </Text>
        <List>
          {projects.map((project) => (
            <List.Item key={project.id}>
              <Text size="sm">{project.name}</Text>
              <Text size="sm">
                {dayjs(project.startDate).format("MMMM D, YYYY")} -{" "}
                {dayjs(project.endDate).format("MMMM D, YYYY")}
              </Text>
              <Text size="sm">{project.description}</Text>
            </List.Item>
          ))}
        </List>
      </Paper>
    </Card>
  );
};

export default ResumeShow;
