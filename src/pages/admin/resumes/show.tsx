import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mantine";
import { Resume } from "../../../interfaces";
import ResumeComponent from "../../../components/ResumeComponent";

export const ResumeShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      {record && <ResumeComponent resume={record as Resume} />}
    </Show>
  );
};
