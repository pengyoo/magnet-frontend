import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  NumberField,
  EmailField,
  DateField,
  TextField,
} from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const UserShow: React.FC<IResourceComponentsProps> = () => {
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
        {translate("Email")}
      </Title>
      <EmailField value={record?.email} />
      <Title my="xs" order={5}>
        {translate("Created At")}
      </Title>
      <DateField value={record?.createdAt} />
      <Title my="xs" order={5}>
        {translate("Role")}
      </Title>
      <TextField value={record?.role} />
      <Title my="xs" order={5}>
        {translate("Status")}
      </Title>
      <TextField value={record?.status} />
    </Show>
  );
};
