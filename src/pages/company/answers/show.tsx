import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import { Show, NumberField, TextField } from "@refinedev/mantine";
import { Divider, Table, Title } from "@mantine/core";
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
        <tbody style={{ marginBottom: 30 }}>
          {record?.answers?.map((answer: any) => {
            return (
              <div key={answer.id}>
                <Divider size={5} />
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
                <tr>
                  <td>AI Score: </td>
                  <td style={{ fontWeight: "bold", color: "red" }}>
                    {answer.score}
                  </td>
                </tr>
              </div>
            );
          })}
        </tbody>
      </Table>
    </Show>
  );
};
