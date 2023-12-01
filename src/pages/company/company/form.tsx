import {
  Button,
  TextInput,
  Card,
  Flex,
  Title,
  Autocomplete,
  Text,
  NumberInput,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNotification } from "@refinedev/core";
import axiosInstance, { API_URL } from "../../../services/axios-instance";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const CompanyForm = () => {
  // form
  const form = useForm({
    initialValues: {
      id: "",
      name: "",
      country: "",
      city: "",
      address: "",
      scale: 0,
      industry: "",
      description: "",
    },

    // Form Validation
    validate: {
      name: (value) =>
        value.length < 2 ? "Full Name must have at least 2 letters" : null,
    },
    validateInputOnBlur: [
      "name",
      "country",
      "city",
      "address",
      "scale",
      "industry",
      "description",
    ],
  });

  // Notification
  const { open } = useNotification();

  // Submit Data
  const handleSubmit = (company: any) => {
    axiosInstance
      .post(API_URL + "/ccompanies", company)
      .then(() => {
        open?.({
          type: "success",
          message: "Company Information has been successfully saved.",
        });
      })
      .catch((err) => {
        open?.({
          type: "error",
          message: err.message,
        });
      });
  };

  const [countries, setCountries] = useState<string[]>([]);

  // Fetch And Display My Resume
  useEffect(() => {
    axiosInstance
      .get(API_URL + "/ccompanies")
      .then((resp) => {
        form.setValues(resp.data);
      })
      .catch((err) => {
        // open?.({
        //   type: "error",
        //   message: err.message,
        // });
      });

    axiosInstance
      .get(API_URL + "/external/countries")
      .then((resp) => {
        setCountries(resp.data);
      })
      .catch((err) => {
        open?.({
          type: "error",
          message: err.message,
        });
      });
  }, []);

  return (
    <Card>
      <Title style={{ fontSize: 22 }}>Company Information</Title>

      <form
        onSubmit={form.onSubmit((values) => {
          // console.log(values);
          handleSubmit(values);
        })}
      >
        <Stack
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          mt="md"
        >
          <TextInput
            label="Name"
            placeholder="Company Name"
            {...form.getInputProps("name")}
            style={{ flex: 1 }}
            withAsterisk
          />
          <Flex gap={50} align="center" mt="xs">
            <Autocomplete
              data={countries}
              label="Country"
              placeholder="Country"
              {...form.getInputProps("country")}
              style={{ flex: 1 }}
              withAsterisk
            />

            <TextInput
              label="City"
              placeholder="City"
              {...form.getInputProps("city")}
              style={{ flex: 1 }}
              withAsterisk
            />
          </Flex>
          <TextInput
            label="Address"
            placeholder="Address"
            {...form.getInputProps("address")}
            style={{ flex: 1 }}
            withAsterisk
          />

          <Flex gap={50} align="center" mt="xs">
            <NumberInput
              label="Scale"
              placeholder="Number of employees you have"
              {...form.getInputProps("scale")}
              style={{ flex: 1 }}
              withAsterisk
            />

            <TextInput
              label="Industry"
              placeholder="Industry"
              {...form.getInputProps("industry")}
              style={{ flex: 1 }}
              withAsterisk
            />
          </Flex>
          <Text
            style={{
              fontSize: "14px",
              fontWeight: "500",
              fontFamily:
                "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
            }}
          >
            Description <span style={{ color: "red" }}>*</span>
          </Text>
          <MDEditor
            {...form.getInputProps("description")}
            data-color-mode="light"
            height={600}
          />
          <Button type="submit" radius="xl" mb="lg">
            Save
          </Button>
          {/* <Code block mt={5}>
            {JSON.stringify(form.values, null, 2)}
          </Code> */}
        </Stack>
      </form>
    </Card>
  );
};

export default CompanyForm;
