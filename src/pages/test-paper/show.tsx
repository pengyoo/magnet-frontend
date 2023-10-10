import {
  IResourceComponentsProps,
  useShow,
  useTable,
  useTranslate,
} from "@refinedev/core";
import { Show, NumberField, TextField } from "@refinedev/mantine";
import { Flex, Stack, Table, Title } from "@mantine/core";
import {
  IconNotebook,
  IconQuestionCircle,
  IconQuestionMark,
} from "@tabler/icons";
import { IconFlagQuestion, IconPencilQuestion } from "@tabler/icons-react";

export const TestPaperShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Flex justify="flex-start" align="center" gap={200}>
        <Flex justify="flex-start" align="center" gap={10}>
          <Title my="xs" order={5}>
            {translate("ID")}
          </Title>
          <NumberField value={record?.id ?? ""} />
        </Flex>
        <Flex justify="flex-start" align="center" gap={10}>
          <Title my="xs" order={5}>
            {translate("Type")}
          </Title>
          <TextField value={record?.type} />
        </Flex>
      </Flex>
      <Title my="xs" order={5}>
        {translate("Questions")}
      </Title>

      <Table highlightOnHover>
        <tbody>
          {record?.questionList?.map((question: any) => {
            return (
              <>
                <tr key={question.id}>
                  <td>
                    <IconPencilQuestion color="#F06418" size={20} />{" "}
                  </td>
                  <td>
                    <TextField
                      style={{ fontWeight: "bold" }}
                      value={question.question}
                    ></TextField>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>{question.standardAnswer}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </Show>
  );
};
