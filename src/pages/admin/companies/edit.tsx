import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { NumberInput, TextInput } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";

export const CompanyEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { queryResult },
  } = useForm({
    initialValues: { id: "", name: "", description: "", address: "" },
  });

  const companyData = queryResult?.data?.data;

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
        label={translate("Company Name")}
        {...getInputProps("name")}
      />
      <MDEditor data-color-mode="light" {...getInputProps("description")} />
      <TextInput
        mt="sm"
        label={translate("Address")}
        {...getInputProps("address")}
      />
    </Edit>
  );
};
