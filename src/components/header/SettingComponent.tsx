import {
  Button,
  Divider,
  Drawer,
  Group,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

interface Props {
  opened: boolean;
  setOpened: (boo: boolean) => void;
}

const SettingComponent = ({ opened, setOpened }: Props) => {
  const form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Title order={4}>Accounting Setting</Title>}
      padding="xl"
      size="md"
      position="right"
    >
      <Divider />
      <form
        style={{ marginTop: 30 }}
        onSubmit={form.onSubmit((values) => console.log(values))}
      >
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Drawer>
  );
};

export default SettingComponent;
