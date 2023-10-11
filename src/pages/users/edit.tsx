import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { NumberInput, PasswordInput, Select, TextInput } from "@mantine/core";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { queryResult },
  } = useForm({
    initialValues: {
      id: "",
      email: "",
      createdAt: "",
      role: "",
      status: "",
      password: "",
    },
  });

  const userData = queryResult?.data?.data;

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
        label={translate("Email")}
        {...getInputProps("email")}
      />

      <PasswordInput
        mt="sm"
        label={translate("Password")}
        {...getInputProps("password")}
      />
      <Select
        label={translate("Role")}
        placeholder="Pick value"
        {...getInputProps("role")}
        data={["JOB_SEEKER", "COMPANY", "ADMIN"]}
      />
      <Select
        label={translate("Status")}
        placeholder="Pick value"
        {...getInputProps("status")}
        data={["REGISTERED", "ACTIVE", "DELETED"]}
      />
    </Edit>
  );
};
