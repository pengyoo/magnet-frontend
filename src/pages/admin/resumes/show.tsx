import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import { Show, NumberField, TextField } from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const ResumeShow: React.FC<IResourceComponentsProps> = () => {
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
        {translate("Full Name")}
      </Title>
      <TextField value={record?.fullName} />
      <Title my="xs" order={5}>
        {translate("Profile")}
      </Title>
      <TextField value={record?.profile} />
      <Title my="xs" order={5}>
        {translate("Status")}
      </Title>
      <TextField value={record?.status} />
    </Show>
  );
};
