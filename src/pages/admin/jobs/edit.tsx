import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { Text, TextInput } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";

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

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextInput
        mt="sm"
        label={translate("Title")}
        {...getInputProps("title")}
        withAsterisk
      />

      <TextInput
        mt="sm"
        label={translate("Salary Range")}
        {...getInputProps("salaryRange")}
        withAsterisk
      />
      <TextInput
        mt="sm"
        label={translate("Location")}
        {...getInputProps("location")}
        withAsterisk
      />
      <TextInput
        mt="sm"
        label={translate("Status")}
        {...getInputProps("status")}
        withAsterisk
      />

      <Text
        style={{
          fontSize: "14px",
          fontWeight: "500",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
        }}
        mt="md"
      >
        Description <span style={{ color: "red" }}>*</span>
      </Text>

      <MDEditor
        {...getInputProps("description")}
        data-color-mode="light"
        preview={"edit"}
        height={600}
      />
    </Edit>
  );
};
