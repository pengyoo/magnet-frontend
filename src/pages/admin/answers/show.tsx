import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
  useOne,
  useMany,
} from "@refinedev/core";
import { Show, NumberField, TextField } from "@refinedev/mantine";
import { Title, Flex, Table } from "@mantine/core";
import { IconNotebook } from "@tabler/icons";

export const AnswerSheetShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: paperData, isLoading: paperIsLoading } = useOne({
    resource: "papers",
    id: record?.paperId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: answersData, isLoading: answersIsLoading } = useMany({
    resource: "answers",
    ids: record?.answers || [],
    queryOptions: {
      enabled: !!record && !!record?.answers?.length,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Flex justify="flex-start" align="center" gap={200}>
        <Flex justify="flex-start" align="center" gap={20}>
          <Title my="xs" order={5}>
            {translate("ID")}
          </Title>
          <NumberField value={record?.id ?? ""} />
        </Flex>
        <Flex justify="flex-start" align="center" gap={20}>
          <Title my="xs" order={5}>
            {translate("Paper ID")}
          </Title>
          <NumberField value={record?.paperId} />
        </Flex>

        <Flex justify="flex-start" align="center" gap={20}>
          <Title my="xs" order={5}>
            {translate("User Email")}
          </Title>
          <TextField value={record?.user?.email} />
        </Flex>
      </Flex>

      <Title my="xs" order={5}>
        {translate("Answers")}
      </Title>
      <Table highlightOnHover>
        <tbody>
          {record?.answers?.map((answer: any) => {
            return (
              <>
                <tr key={answer.id}>
                  <td>Q: </td>
                  <td>{answer.questionText}</td>
                </tr>
                <tr>
                  <td>
                    <IconNotebook color="#F06418" size={20} />{" "}
                  </td>
                  <td>
                    <TextField
                      style={{ fontWeight: "bold" }}
                      value={answer.answer}
                    ></TextField>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>

      {/* {paperIsLoading ? <>Loading...</> : <>{paperData?.data}</>}
      <Title my="xs" order={5}>
        {translate("answers")}
      </Title>
      {answersIsLoading && record?.answers?.length ? (
        <>Loading...</>
      ) : (
        <>Not Handled.</>
      )} */}
    </Show>
  );
};
