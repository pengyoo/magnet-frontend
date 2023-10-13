import {
  ActionIcon,
  Box,
  Button,
  Group,
  TextInput,
  Text,
  Card,
  Flex,
  Space,
  Textarea,
  Title,
  Affix,
  Autocomplete,
  Grid,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { isEmail, useForm, FORM_INDEX } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { useNotification } from "@refinedev/core";
import axiosInstance, { API_URL } from "../../../services/axios-instance";
import { IconEdit, IconTrash } from "@tabler/icons";
import { SyntheticEvent, useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";

const ResumeForm = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [skillPrompts, setSkillPrompts] = useState<string[]>([]);

  const handleFetchSkillPrompts = (
    e: SyntheticEvent<HTMLInputElement, Event>
  ) => {
    // const skillValue = form.values.skills[index].skill;
    axiosInstance
      .get(API_URL + "/external/skills?skill=" + e.currentTarget.value)
      .then((resp) => {
        setSkillPrompts(resp.data);
      })
      .catch((err) => {
        open?.({
          type: "error",
          message: err,
        });
      });
  };
  // form
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
        linkedInUrl: "",
      },
      skills: [
        {
          id: "",
          skill: "",
          key: randomId(),
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
          key: randomId(),
        },
      ],
      experience: [
        {
          id: "",
          position: "",
          companyName: "",
          startDate: "",
          endDate: "",
          description: "",
          location: "",
          key: randomId(),
        },
      ],

      projects: [
        {
          id: "",
          name: "",
          startDate: "",
          endDate: "",
          description: "",
          key: randomId(),
        },
      ],
    },

    // Form Validation
    validate: {
      fullName: (value) =>
        value.length < 2 ? "Full Name must have at least 2 letters" : null,
      contact: {
        email: isEmail("Invalid email"),
        phoneNumber: (value) =>
          /^\+\d{1,4}\d{6,}$/.test(value) ? null : "Invalid Phonenumber",
        country: (value) =>
          value.length === 0 ? "Country can not be empty" : null,
      },
      skills: {
        skill: (value) =>
          value.length === 0 ? "Skill can not be empty" : null,
      },
      education: {
        schoolName: (value) =>
          value.length === 0 ? "School Name can not be empty" : null,
        degree: (value) =>
          value.length === 0 ? "Degree can not be empty" : null,
        major: (value) =>
          value.length === 0 ? "Major can not be empty" : null,
        startDate: (value) =>
          value.length === 0 ? "Start Date can not be empty" : null,
        endDate: (value) =>
          value.length === 0 ? "End Date can not be empty" : null,
      },
      experience: {
        position: (value) =>
          value.length === 0 ? "Title can not be empty" : null,
        companyName: (value) =>
          value.length === 0 ? "Company can not be empty" : null,
        startDate: (value) =>
          value.length === 0 ? "Start Date can not be empty" : null,
        endDate: (value) =>
          value.length === 0 ? "End Date can not be empty" : null,
        description: (value) =>
          value.length === 0 ? "Description can not be empty" : null,
        key: randomId(),
      },
      projects: {
        name: (value) =>
          value.length === 0 ? "Project Name can not be empty" : null,
        startDate: (value) =>
          value.length === 0 ? "Start Date can not be empty" : null,
        endDate: (value) =>
          value.length === 0 ? "End Date can not be empty" : null,
        description: (value) =>
          value.length === 0 ? "Project description can not be empty" : null,
        key: randomId(),
      },
    },
    validateInputOnBlur: [
      "fullName",
      "contact.email",
      "contact.phoneNumber",
      "contact.country",
      `skills.${FORM_INDEX}.skill`,
      `education.${FORM_INDEX}.schoolName`,
      `education.${FORM_INDEX}.degree`,
      `education.${FORM_INDEX}.major`,
      `education.${FORM_INDEX}.startDate`,
      `education.${FORM_INDEX}.endDate`,
      `experience.${FORM_INDEX}.position`,
      `experience.${FORM_INDEX}.companyName`,
      `experience.${FORM_INDEX}.startDate`,
      `experience.${FORM_INDEX}.endDate`,
      `experience.${FORM_INDEX}.description`,
      `projects.${FORM_INDEX}.name`,
      `projects.${FORM_INDEX}.description`,
      `projects.${FORM_INDEX}.startDate`,
      `projects.${FORM_INDEX}.endDate`,
    ],
  });

  // Skills Fields
  const skillFields = form.values.skills.map((item, index) => (
    <Group key={item.key} position="left" p={2}>
      <Autocomplete
        data={skillPrompts}
        // label="Skill"
        placeholder="Skill"
        maw={130}
        size="xs"
        onSelect={(e) => handleFetchSkillPrompts(e)}
        {...form.getInputProps(`skills.${index}.skill`)}
        // withAsterisk
        disabled={isDisabled}
      />

      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("skills", index)}
        disabled={isDisabled}
        hidden={isDisabled}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  // Educations Fields
  const educationFields = form.values.education.map((item, index) => (
    <Box key={item.key} mt="xs">
      <Space m="lg" />
      <Text style={{ fontWeight: "bold" }}>Education {index + 1}</Text>
      <TextInput
        label="School Name"
        placeholder="School Name"
        style={{ flex: 1 }}
        {...form.getInputProps(`education.${index}.schoolName`)}
        withAsterisk
        disabled={isDisabled}
      />
      <Space m="md" />
      <Flex gap={50} align="center">
        <TextInput
          label="Degree"
          placeholder="Degree"
          style={{ flex: 1 }}
          {...form.getInputProps(`education.${index}.degree`)}
          withAsterisk
          disabled={isDisabled}
        />

        <TextInput
          label="Major"
          placeholder="Major"
          style={{ flex: 1 }}
          {...form.getInputProps(`education.${index}.major`)}
          withAsterisk
          disabled={isDisabled}
        />
      </Flex>
      <Space m="md" />
      <Flex gap={50} align="center">
        <TextInput
          type="date"
          label="Start Date"
          placeholder="Start Date"
          style={{ flex: 1 }}
          {...form.getInputProps(`education.${index}.startDate`)}
          withAsterisk
          disabled={isDisabled}
        />

        <TextInput
          type="date"
          label="End Date"
          placeholder="End Date"
          style={{ flex: 1 }}
          {...form.getInputProps(`education.${index}.endDate`)}
          withAsterisk
          disabled={isDisabled}
        />
      </Flex>
      <ActionIcon
        color="red"
        disabled={isDisabled}
        hidden={isDisabled}
        onClick={() => form.removeListItem("education", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Box>
  ));

  // Work Experience Fields
  const experienceFields = form.values.experience.map((item, index) => (
    <Box key={item.key} mt="xs">
      <Space m="lg" />
      <Text style={{ fontWeight: "bold" }}>Experience {index + 1}</Text>
      <TextInput
        label="Company Name"
        placeholder="Company Name"
        style={{ flex: 1 }}
        {...form.getInputProps(`experience.${index}.companyName`)}
        withAsterisk
        disabled={isDisabled}
      />
      <TextInput
        label="Title"
        placeholder="Title"
        style={{ flex: 1 }}
        {...form.getInputProps(`experience.${index}.position`)}
        withAsterisk
        disabled={isDisabled}
      />

      <Space m="md" />
      <Flex gap={50} align="center">
        <TextInput
          type="date"
          label="Start Date"
          placeholder="Start Date"
          style={{ flex: 1 }}
          {...form.getInputProps(`experience.${index}.startDate`)}
          withAsterisk
          disabled={isDisabled}
        />

        <TextInput
          type="date"
          label="End Date"
          placeholder="End Date"
          style={{ flex: 1 }}
          {...form.getInputProps(`experience.${index}.endDate`)}
          withAsterisk
          disabled={isDisabled}
        />
      </Flex>

      <Textarea
        label="Description"
        placeholder="Description"
        minRows={3}
        autosize
        style={{ flex: 1 }}
        {...form.getInputProps(`experience.${index}.description`)}
        withAsterisk
        disabled={isDisabled}
      />
      <TextInput
        label="Location"
        placeholder="Location"
        style={{ flex: 1 }}
        {...form.getInputProps(`experience.${index}.location`)}
        disabled={isDisabled}
      />

      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("experience", index)}
        disabled={isDisabled}
        hidden={isDisabled}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Box>
  ));

  // Projects Fields
  const projectsFields = form.values.projects.map((item, index) => (
    <Box key={item.key} mt="xs">
      <Space m="lg" />
      <Text style={{ fontWeight: "bold" }}>Project {index + 1}</Text>
      <TextInput
        label="Project Name"
        placeholder="Project Name"
        style={{ flex: 1 }}
        {...form.getInputProps(`projects.${index}.name`)}
        withAsterisk
        disabled={isDisabled}
      />

      <Space m="md" />
      <Flex gap={50} align="center">
        <TextInput
          type="date"
          label="Start Date"
          placeholder="Start Date"
          style={{ flex: 1 }}
          {...form.getInputProps(`projects.${index}.startDate`)}
          withAsterisk
          disabled={isDisabled}
        />
        <TextInput
          type="date"
          label="End Date"
          placeholder="End Date"
          style={{ flex: 1 }}
          {...form.getInputProps(`projects.${index}.endDate`)}
          withAsterisk
          disabled={isDisabled}
        />
      </Flex>

      <Textarea
        label="Description"
        placeholder="Description"
        style={{ flex: 1 }}
        {...form.getInputProps(`projects.${index}.description`)}
        withAsterisk
        disabled={isDisabled}
        minRows={3}
        autosize
      />

      <ActionIcon
        color="red"
        onClick={() => form.removeListItem("projects", index)}
        disabled={isDisabled}
        hidden={isDisabled}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Box>
  ));

  // Notification
  const { open } = useNotification();

  // Submit Data
  const handleSubmit = (resume: any) => {
    axiosInstance
      .post(API_URL + "/sresumes", resume)
      .then((resp) => {
        setDisabled(true);
        open?.({
          type: "success",
          message: "Your resume has been successfully saved.",
        });
      })
      .catch((err) => {
        open?.({
          type: "error",
          message: err,
        });
      });
  };

  const [countries, setCountries] = useState<string[]>([]);

  // Fetch And Display My Resume
  useEffect(() => {
    axiosInstance
      .get(API_URL + "/sresumes")
      .then((resp) => {
        form.setValues(resp.data);

        //TODO: display startDate and endDate in Datepicker
      })
      .catch((err) => {
        open?.({
          type: "error",
          message: err,
        });
      });

    axiosInstance
      .get(API_URL + "/external/countries")
      .then((resp) => {
        setCountries(resp.data);
      })
      .catch((err) => {
        open?.({
          type: "error",
          message: err,
        });
      });
  }, []);

  return (
    <Card>
      <Title style={{ fontSize: 22 }}>My Resume</Title>
      <Affix position={{ top: 100, right: 60 }}>
        <ActionIcon
          color={isDisabled ? "blue" : "red"}
          onClick={() => {
            setDisabled(!isDisabled);
          }}
          title="Edit Resume"
        >
          {" "}
          <IconEdit />
        </ActionIcon>
      </Affix>
      {!isDisabled && (
        <Affix position={{ top: 100, right: 25 }}>
          <ActionIcon
            color="blue"
            onClick={() => {
              if (!isDisabled) {
                handleSubmit(form.values);
              }
              setDisabled(!isDisabled);
            }}
            title="Save Resume"
          >
            {" "}
            <AiOutlineSave size={23} />
          </ActionIcon>
        </Affix>
      )}
      <form
        onSubmit={form.onSubmit((values) => {
          // console.log(values);
          handleSubmit(values);
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
              withAsterisk
              disabled={isDisabled}
            />
            <TextInput
              label="Email"
              placeholder="Your Email"
              {...form.getInputProps("contact.email")}
              style={{ flex: 1 }}
              withAsterisk
              disabled={isDisabled}
            />
          </Flex>
          <Textarea
            label="Profile"
            minRows={4}
            autosize
            placeholder="Your Profile"
            {...form.getInputProps("profile")}
            style={{ flex: 1 }}
            disabled={isDisabled}
          />

          <Space m="md" />
          <h3>Contact</h3>
          <Flex gap={50} align="center">
            <TextInput
              label="Phone Number"
              placeholder="Your phone number"
              {...form.getInputProps("contact.phoneNumber")}
              style={{ flex: 1 }}
              withAsterisk
              disabled={isDisabled}
            />
            {/* <TextInput
              label="Country"
              placeholder="Your Country"
              {...form.getInputProps("contact.country")}
              style={{ flex: 1 }}
              withAsterisk
              disabled={isDisabled}
            /> */}

            <Autocomplete
              data={countries}
              label="Country"
              placeholder="Your Country"
              {...form.getInputProps("contact.country")}
              style={{ flex: 1 }}
              withAsterisk
              disabled={isDisabled}
            />

            {/* <Select
              data={countries}
              label="Country"
              placeholder="Your Country"
              {...form.getInputProps("contact.country")}
              style={{ flex: 1 }}
              withAsterisk
              disabled={isDisabled}
            /> */}
          </Flex>
          <Space m="md" />
          <Flex gap={50} align="center">
            <TextInput
              label="City"
              placeholder="Your City"
              {...form.getInputProps("contact.city")}
              style={{ flex: 1 }}
              disabled={isDisabled}
            />
            <TextInput
              label="Post Code"
              placeholder="Your Post Code"
              {...form.getInputProps("contact.postCode")}
              style={{ flex: 1 }}
              disabled={isDisabled}
            />
          </Flex>
          <Space m="md" />
          <TextInput
            label="Address"
            placeholder="Your Address"
            {...form.getInputProps("contact.address")}
            disabled={isDisabled}
          />
          <Space m="md" />
          <TextInput
            label="LinkedIn Profile"
            placeholder="Your LinkedIn Profile Link"
            {...form.getInputProps("contact.linkedInUrl")}
            disabled={isDisabled}
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
          <Group>{skillFields}</Group>
          <Group mt="md">
            <Button
              variant="outline"
              onClick={() =>
                form.insertListItem("skills", {
                  skill: "",
                  key: randomId(),
                })
              }
              disabled={isDisabled}
              hidden={isDisabled}
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
                  schoolName: "",
                  degree: "",
                  major: "",
                  startDate: "",
                  endDate: "",
                  key: randomId(),
                })
              }
              disabled={isDisabled}
              hidden={isDisabled}
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
                  position: "",
                  companyName: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                  location: "",
                  key: randomId(),
                })
              }
              disabled={isDisabled}
              hidden={isDisabled}
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
                  name: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                  key: randomId(),
                })
              }
              disabled={isDisabled}
              hidden={isDisabled}
            >
              Add Project
            </Button>
          </Group>

          <Space m="md" />
          <Space m="md" />
          <Button
            disabled={isDisabled}
            hidden={isDisabled}
            w="100%"
            type="submit"
            radius="xl"
          >
            Submit
          </Button>
          {/* <Code block mt={5}>
            {JSON.stringify(form.values, null, 2)}
          </Code> */}
        </Box>
      </form>
    </Card>
  );
};

export default ResumeForm;
