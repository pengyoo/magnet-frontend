import {
  ActionIcon,
  Box,
  Button,
  Code,
  Group,
  TextInput,
  Text,
  Card,
  Flex,
  Space,
  Textarea,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons";
import React from "react";

const Resume = () => {
  const form = useForm({
    initialValues: {
      id: "",
      fullName: "",
      profile: "",
      contact: {
        id: "",
        phoneNumber: "",
        email: "",
        address: "",
        city: "",
        country: "",
        postCode: "",
        linkedInUrl: "string",
      },
      skills: [
        {
          id: "",
          skill: "",
        },
      ],
      education: [
        {
          id: "",
          schoolName: "",
          degree: "",
          major: "",
          startDate: "",
          endDate: "",
        },
      ],
      experience: [
        {
          id: 0,
          position: "",
          companyName: "",
          startDate: "",
          endDate: "",
          description: "",
          location: "",
        },
      ],

      projects: [
        {
          id: "",
          name: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    },
  });

  // Skills Fields
  const skillFields = form.values.skills.map((item, index) => (
    <Flex key={item.id} mt="xs">
      <TextInput
        placeholder="Skill"
        style={{ flex: 1 }}
        {...form.getInputProps(`skills.${index}.skill`)}
      />

      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("skills", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Flex>
  ));

  // Educations Fields
  const educationFields = form.values.education.map((item, index) => (
    <Box key={item.id} mt="xs">
      <TextInput
        label="School Name"
        placeholder="School Name"
        style={{ flex: 1 }}
        {...form.getInputProps(`education.${index}.schoolName`)}
      />
      <Space m="md" />
      <Flex gap={50} align="center">
        <TextInput
          label="Degree"
          placeholder="Degree"
          style={{ flex: 1 }}
          {...form.getInputProps(`education.${index}.degree`)}
        />

        <TextInput
          label="Major"
          placeholder="Major"
          style={{ flex: 1 }}
          {...form.getInputProps(`education.${index}.major`)}
        />
      </Flex>
      <Space m="md" />
      <Flex gap={50} align="center">
        <DatePicker
          label="Start Date"
          placeholder="Start Date"
          style={{ flex: 1 }}
          {...form.getInputProps(`education.${index}.startDate`)}
          withAsterisk
        />

        <DatePicker
          label="End Date"
          placeholder="End Date"
          style={{ flex: 1 }}
          {...form.getInputProps(`education.${index}.endDate`)}
          withAsterisk
        />
      </Flex>
      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("education", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Box>
  ));

  // Work Experience Fields
  const experienceFields = form.values.experience.map((item, index) => (
    <Box key={item.id} mt="xs">
      <TextInput
        label="Company Name"
        placeholder="Company Name"
        style={{ flex: 1 }}
        {...form.getInputProps(`experience.${index}.companyName`)}
      />
      <TextInput
        label="Title"
        placeholder="Title"
        style={{ flex: 1 }}
        {...form.getInputProps(`experience.${index}.position`)}
      />

      <Space m="md" />
      <Flex gap={50} align="center">
        <DatePicker
          label="Start Date"
          placeholder="Start Date"
          style={{ flex: 1 }}
          {...form.getInputProps(`experience.${index}.startDate`)}
          withAsterisk
        />

        <DatePicker
          label="End Date"
          placeholder="End Date"
          style={{ flex: 1 }}
          {...form.getInputProps(`experience.${index}.endDate`)}
          withAsterisk
        />
      </Flex>

      <Textarea
        label="Description"
        placeholder="Description"
        style={{ flex: 1 }}
        {...form.getInputProps(`experience.${index}.description`)}
      />
      <TextInput
        label="Location"
        placeholder="Location"
        style={{ flex: 1 }}
        {...form.getInputProps(`experience.${index}.location`)}
      />

      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("experience", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Box>
  ));

  // Projects Fields
  const projectsFields = form.values.projects.map((item, index) => (
    <Box key={item.id} mt="xs">
      <TextInput
        label="Project Name"
        placeholder="Project Name"
        style={{ flex: 1 }}
        {...form.getInputProps(`projects.${index}.name`)}
      />

      <Space m="md" />
      <Flex gap={50} align="center">
        <DatePicker
          label="Start Date"
          placeholder="Start Date"
          style={{ flex: 1 }}
          {...form.getInputProps(`projects.${index}.startDate`)}
          withAsterisk
        />

        <DatePicker
          label="End Date"
          placeholder="End Date"
          style={{ flex: 1 }}
          {...form.getInputProps(`projects.${index}.endDate`)}
          withAsterisk
        />
      </Flex>

      <Textarea
        label="Description"
        placeholder="Description"
        style={{ flex: 1 }}
        {...form.getInputProps(`projects.${index}.description`)}
      />

      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("projects", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Box>
  ));

  return (
    <Card p="md">
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
        <Box>
          <h3>Basic</h3>
          <Flex gap={50} align="center" mt="xs">
            <TextInput
              label="Full Name"
              placeholder="Your full name"
              {...form.getInputProps("fullName")}
              style={{ flex: 1 }}
            />
            <TextInput
              label="Email"
              placeholder="Your Email"
              {...form.getInputProps("contact.email")}
              style={{ flex: 1 }}
            />
          </Flex>
          <Textarea
            label="Profile"
            placeholder="Your Profile"
            {...form.getInputProps("profile")}
            style={{ flex: 1 }}
          />

          <Space m="md" />
          <h3>Contact</h3>
          <Flex gap={50} align="center">
            <TextInput
              label="Post Code"
              placeholder="Your Post Code"
              {...form.getInputProps("contact.postCode")}
              style={{ flex: 1 }}
            />
            <TextInput
              label="Phone Number"
              placeholder="Your phone number"
              {...form.getInputProps("contact.phoneNumber")}
              style={{ flex: 1 }}
            />
          </Flex>
          <Space m="md" />
          <Flex gap={50} align="center">
            <TextInput
              label="City"
              placeholder="Your City"
              {...form.getInputProps("contact.city")}
              style={{ flex: 1 }}
            />
            <TextInput
              label="Country"
              placeholder="Your Country"
              {...form.getInputProps("contact.country")}
              style={{ flex: 1 }}
            />
          </Flex>
          <Space m="md" />
          <TextInput
            label="Address"
            placeholder="Your Address"
            {...form.getInputProps("contact.address")}
          />
          <Space m="md" />
          <TextInput
            label="LinkedIn Profile"
            placeholder="Your LinkedIn Profile Link"
            {...form.getInputProps("contact.linkedIn")}
          />
          <Space m="md" />

          <h3>Skills</h3>
          {skillFields.length > 0 ? (
            <Text></Text>
          ) : (
            <Text c="dimmed" ta="center">
              No one here...
            </Text>
          )}

          {skillFields}

          <Group mt="md">
            <Button
              variant="outline"
              onClick={() =>
                form.insertListItem("skills", {
                  skill: "",
                  key: randomId(),
                })
              }
            >
              Add Skill
            </Button>
          </Group>
          <Space m="md" />

          <h3>Education</h3>
          {educationFields.length > 0 ? (
            <Text></Text>
          ) : (
            <Text c="dimmed" ta="center">
              No one here...
            </Text>
          )}

          {educationFields}

          <Group mt="md">
            <Button
              variant="outline"
              onClick={() =>
                form.insertListItem("education", {
                  key: randomId(),
                })
              }
            >
              Add Education
            </Button>
          </Group>
          <Space m="md" />

          <h3>Work Experience</h3>
          {experienceFields.length > 0 ? (
            <Text></Text>
          ) : (
            <Text c="dimmed" ta="center">
              No one here...
            </Text>
          )}

          {experienceFields}

          <Group mt="md">
            <Button
              variant="outline"
              onClick={() =>
                form.insertListItem("experience", {
                  key: randomId(),
                })
              }
            >
              Add Experience
            </Button>
          </Group>

          <h3>Projects</h3>
          {projectsFields.length > 0 ? (
            <Text></Text>
          ) : (
            <Text c="dimmed" ta="center">
              No one here...
            </Text>
          )}

          {projectsFields}

          <Group mt="md">
            <Button
              variant="outline"
              onClick={() =>
                form.insertListItem("projects", {
                  key: randomId(),
                })
              }
            >
              Add Project
            </Button>
          </Group>

          <Space m="md" />
          <Space m="md" />
          <Button w="100%" type="submit" radius="xl">
            Submit
          </Button>
          <Code block mt={5}>
            {JSON.stringify(form.values, null, 2)}
          </Code>
        </Box>
      </form>
    </Card>
  );
};

export default Resume;
