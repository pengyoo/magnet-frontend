import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/mantine";
import {
  Select,
  Group,
  ActionIcon,
  Box,
  Textarea,
  Flex,
  Button,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons";

export const TestEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    removeListItem,
    insertListItem,
    saveButtonProps,
    refineCore: { formLoading },
    values,
  } = useForm({
    initialValues: {
      id: "",
      type: "",
      job: { id: "" },
      questionList: [
        {
          id: "",
          question: "",
          type: "FREE_TEXT",
          standardAnswer: "",
          key: randomId(),
        },
      ],
    },
  });

  // questionList
  const questionListFields = values.questionList.map((item, index) => (
    <Flex style={{ width: "100%" }} key={item.key} p={2} gap="md" my="lg">
      <Textarea
        label={"Question " + (index + 1)}
        minRows={3}
        autosize
        placeholder="Question"
        style={{ flex: 1 }}
        {...getInputProps(`questionList.${index}.question`)}
      />
      <Textarea
        label={"Example Answer " + (index + 1)}
        minRows={3}
        autosize
        placeholder="Example Answer"
        style={{ flex: 1 }}
        {...getInputProps(`questionList.${index}.standardAnswer`)}
      />
      <ActionIcon
        color="red"
        onClick={() => removeListItem("questionList", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Flex>
  ));

  const { selectProps: jobSelectProps } = useSelect({
    resource: "cjobs",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Select
        data={[
          { value: "TECHNOLOGY", label: "Technology" },
          { value: "BEHAVIOUR", label: "Behaviour" },
        ]}
        mt="sm"
        label={"Select a Question Type"}
        {...getInputProps("type")}
      ></Select>
      <Select
        mt="sm"
        label={"Select a Job Position"}
        {...getInputProps("job.id")}
        {...jobSelectProps}
      />
      <Box>{questionListFields}</Box>
      <Group mt="md">
        <Button
          variant="outline"
          onClick={() =>
            insertListItem("questionList", {
              id: "",
              question: "",
              type: "FREE_TEXT",
              standardAnswer: "",
              key: randomId(),
            })
          }
        >
          Add Question
        </Button>
      </Group>
    </Create>
  );
};
