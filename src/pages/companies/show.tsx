import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import { Show, NumberField, TextField } from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const CompanyShow: React.FC<IResourceComponentsProps> = () => {
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
        {translate("Compane Name")}
      </Title>
      <TextField value={record?.name} />
      <Title my="xs" order={5}>
        {translate("Description")}
      </Title>
      <TextField value={record?.description} />
      <Title my="xs" order={5}>
        {translate("Address")}
      </Title>
      <TextField value={record?.address} />
    </Show>
  );
};
