import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  NumberField,
  TextField,
  MarkdownField,
} from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const JobShow: React.FC<IResourceComponentsProps> = () => {
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
        {translate("Title")}
      </Title>
      <TextField value={record?.title} />
      <Title mt="xs" order={5}>
        {translate("Description")}
      </Title>
      <MarkdownField value={record?.description} />
      <Title my="xs" order={5}>
        {translate("Salary Range")}
      </Title>
      <TextField value={record?.salaryRange} />
      <Title my="xs" order={5}>
        {translate("Location")}
      </Title>
      <TextField value={record?.location} />
      <Title my="xs" order={5}>
        {translate("Status")}
      </Title>
      <TextField value={record?.status} />
      <Title my="xs" order={5}>
        {translate("Company")}
      </Title>
      <TextField value={record?.company?.name} />
    </Show>
  );
};
