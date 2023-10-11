import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { NumberInput, TextInput } from "@mantine/core";

export const ResumeEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { queryResult },
  } = useForm({
    initialValues: { id: "", fullName: "", profile: "", status: "" },
  });

  const resumeData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <NumberInput
        mt="sm"
        disabled
        label={translate("ID")}
        {...getInputProps("id")}
      />
      <TextInput
        mt="sm"
        label={translate("Full Name")}
        {...getInputProps("fullName")}
      />
      <TextInput
        mt="sm"
        label={translate("Profile")}
        {...getInputProps("profile")}
      />
      <TextInput
        mt="sm"
        label={translate("Status")}
        {...getInputProps("status")}
      />
    </Edit>
  );
};
