import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
  useOne,
} from "@refinedev/core";
import { Show, NumberField, DateField, TextField } from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const MyApplicationShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title my="xs" order={5}>
        {translate("ID")}
      </Title>
      <NumberField value={record?.id ?? ""} />
      <Title my="xs" order={5}>
        {translate("Applied Date")}
      </Title>
      <DateField value={record?.appliedDate} />
      <Title my="xs" order={5}>
        {translate("Status")}
      </Title>
      <TextField value={record?.status} />

      <Title my="xs" order={5}>
        {translate("Job")}
      </Title>
      <TextField value={record?.job?.title} />
    </Show>
  );
};
