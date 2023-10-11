import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useForm } from "@refinedev/mantine";
import { PasswordInput, Select, TextInput } from "@mantine/core";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { formLoading },
  } = useForm({
    initialValues: {
      email: "",
      createdAt: "",
      role: "",
      status: "",
      password: "",
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
      {/* 
                    DatePicker component is not included in "@refinedev/mantine" package.
                    To use a <DatePicker> component, you can follow the official documentation for Mantine.
                    
                    Docs: https://mantine.dev/dates/date-picker/
                */}

      {/* <TextInput mt="sm" label={translate("Role")} {...getInputProps("role")} /> */}
      <Select
        label={translate("Role")}
        placeholder="Pick value"
        {...getInputProps("role")}
        data={["JOB_SEEKER", "COMPANY", "ADMIN"]}
      />
      {/* <TextInput
        mt="sm"
        label={translate("status")}
        {...getInputProps("status")}
      /> */}
      <Select
        label={translate("Status")}
        placeholder="Pick value"
        {...getInputProps("status")}
        data={["REGISTERED", "ACTIVE", "DELETED"]}
      />
    </Create>
  );
};
