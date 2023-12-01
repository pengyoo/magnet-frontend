import {
  IResourceComponentsProps,
  useNotification,
  useShow,
} from "@refinedev/core";
import { Button, Paper, Stack, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { useEffect } from "react";
import axiosInstance, { API_URL } from "../../../services/axios-instance";

export const MyTestInvitationShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data } = queryResult;

  const record = data?.data;

  const form = useForm({
    initialValues: {
      id: "",
      paperId: "",
      invitationId: "",
      answers: [
        {
          id: "",
          questionText: "",
          answer: "",
          questionId: "",
          exampleAnswer: "",
        },
      ],
    },
  });

  // Notification
  const { open } = useNotification();

  const handleSubmit = () => {
    console.log(form.values);
    axiosInstance
      .post(API_URL + "/answers/save_sheet", form.values)
      .then((resp) => {
        open?.({
          type: "success",
          message: "Test successfully submited",
        });
      })
      .catch((err) => {
        open?.({
          type: "error",
          message: err.message,
        });
      });
  };

  // Add fields
  useEffect(() => {
    const updatedAnswers = record?.testPaper?.questionList?.map(
      (question: any) => ({
        questionText: question.question,
        exampleAnswer: question.standardAnswer,
        key: randomId(),
        answer: "",
        questionId: question.id,
      })
    );

    form.setFieldValue("answers", updatedAnswers);
    form.setFieldValue("paperId", record?.testPaper?.id);
    form.setFieldValue("invitationId", record?.id as string);
  }, [record]);

  return (
    <Paper p="lg">
      <form
        onSubmit={form.onSubmit(() => {
          handleSubmit();
        })}
      >
        {record?.testPaper?.questionList?.map(
          (question: any, index: number) => (
            <Stack key={question.id}>
              <Stack>
                <Title order={6}>
                  Question {index + 1}: {question.question}
                </Title>
              </Stack>
              <Stack>
                <Textarea
                  // label="Answer"
                  minRows={4}
                  autosize
                  placeholder="Your Answer"
                  {...form.getInputProps(`answers.${index}.answer`)}
                  hidden={record?.status === "FINISHED"}
                />
                <Textarea
                  {...form.getInputProps(`answers.${index}.questionText`)}
                  hidden={true}
                />
                <Textarea
                  {...form.getInputProps(question.standardAnswer)}
                  hidden={true}
                />
              </Stack>
            </Stack>
          )
        )}
        <Button w="100%" type="submit" hidden={true}>
          Submit
        </Button>
      </form>
    </Paper>
  );
};
