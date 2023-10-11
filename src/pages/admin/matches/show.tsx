import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import { Show, NumberField } from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const MatchingIndexShow: React.FC<IResourceComponentsProps> = () => {
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
        {translate("Degree")}
      </Title>
      <NumberField value={record?.degree ?? ""} />
      <Title my="xs" order={5}>
        {translate("Major")}
      </Title>
      <NumberField value={record?.major ?? ""} />
      <Title my="xs" order={5}>
        {translate("Experience")}
      </Title>
      <NumberField value={record?.experience ?? ""} />
      <Title my="xs" order={5}>
        {translate("Skill")}
      </Title>
      <NumberField value={record?.skill ?? ""} />
      <Title my="xs" order={5}>
        {translate("Language")}
      </Title>
      <NumberField value={record?.language ?? ""} />
      <Title my="xs" order={5}>
        {translate("Overall")}
      </Title>
      <NumberField value={record?.overall ?? ""} />
    </Show>
  );
};
