import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import { Show, NumberField, TextField } from "@refinedev/mantine";
import { Table, Title } from "@mantine/core";
import { IconPencilQuestion } from "@tabler/icons-react";

export const TestResultShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title my="xs" order={5}>
        ID
      </Title>
      <NumberField value={record?.id ?? ""} />
      <Title my="xs" order={5}>
        Paper ID
      </Title>
      <NumberField value={record?.paperId ?? ""} />
      <Title my="xs" order={5}>
        Applicant
      </Title>
      <TextField value={record?.applicant} />

      <Table highlightOnHover mt={20}>
        {record?.answers?.map((answer: any) => {
          return (
            <tbody key={answer.id} style={{ marginBottom: 30 }}>
              <tr>
                <td>
                  <IconPencilQuestion color="#F06418" size={20} />{" "}
                </td>
                <td>
                  <TextField value={answer.questionText}></TextField>
                </td>
              </tr>
              <tr>
                <td>Answer: </td>
                <td style={{ fontWeight: "bold" }}>{answer.answer}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </Show>
  );
};
