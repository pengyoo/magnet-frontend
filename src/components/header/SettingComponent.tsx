import {
  Button,
  Divider,
  Drawer,
  Group,
  PasswordInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import axiosInstance, { API_URL } from "../../services/axios-instance";
import { useNotification } from "@refinedev/core";

interface Props {
  opened: boolean;
  setOpened: (boo: boolean) => void;
}

const SettingComponent = ({ opened, setOpened }: Props) => {
  const form = useForm({
    initialValues: {
      password: "",
      rePassword: "",
    },

    validate: {
      password: (value) =>
        value.length < 8
          ? "The length of password must be longer or equals 8"
          : null,
      rePassword: (value, values) =>
        value != values.password ? "Password doesn't match." : null,
    },
  });

  // Notification
  const { open } = useNotification();

  const handleResetPassword = () => {
    axiosInstance
      .post(`${API_URL}/users/reset_password`, form.values)
      .then(() => {
        open?.({
          type: "success",
          message: "Reset password successfully!",
        });
        setOpened(false);
      })
      .catch((err) => {
        open?.({
          type: "error",
          message: err.message,
        });
        setOpened(false);
      });
  };
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Title order={4}>Reset Password</Title>}
      padding="xl"
      size="md"
      position="right"
    >
      <Divider />
      <form
        style={{ marginTop: 30 }}
        onSubmit={form.onSubmit(handleResetPassword)}
      >
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="type your new password"
          {...form.getInputProps("password")}
        />

        <PasswordInput
          withAsterisk
          label="Repeat Password"
          placeholder="repeat your new password"
          {...form.getInputProps("rePassword")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Drawer>
  );
};

export default SettingComponent;
