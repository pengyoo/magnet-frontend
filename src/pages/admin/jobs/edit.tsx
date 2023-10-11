import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { NumberInput, TextInput, Textarea, Select } from "@mantine/core";

export const JobEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { queryResult },
  } = useForm({
    initialValues: {
      id: "",
      title: "",
      description: "",
      salaryRange: "",
      location: "",
      status: "",
      company: { id: "" },
    },
  });

  const jobData = queryResult?.data?.data;

  const { selectProps: companySelectProps } = useSelect({
    resource: "company",
    defaultValue: jobData?.company?.id,
  });

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
        label={translate("Title")}
        {...getInputProps("title")}
      />
      <Textarea
        mt="sm"
        label={translate("Description")}
        autosize
        {...getInputProps("description")}
      />
      <TextInput
        mt="sm"
        label={translate("Salary Range")}
        {...getInputProps("salaryRange")}
      />
      <TextInput
        mt="sm"
        label={translate("Location")}
        {...getInputProps("location")}
      />
      <TextInput
        mt="sm"
        label={translate("Status")}
        {...getInputProps("status")}
      />
      <TextInput
        mt="sm"
        disabled
        label={translate("Company")}
        {...getInputProps("company.name")}
      />
    </Edit>
  );
};
