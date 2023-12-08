import {
  Avatar,
  Button,
  Divider,
  Drawer,
  FileButton,
  Group,
  PasswordInput,
  Space,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import axiosInstance, { API_URL } from "../../services/axios-instance";
import { useGetIdentity, useNotification } from "@refinedev/core";
import { User } from "../../interfaces";
import { LOGIN_USER } from "../../authProvider";

import { LoadingOverlay } from "@mantine/core";

interface Props {
  opened: boolean;
  setOpened: (boo: boolean) => void;
  headShot: string | undefined;
  setHeadShot: (headShotName: string) => void;
}

const SettingComponent = ({
  opened,
  setOpened,
  headShot,
  setHeadShot,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

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

  const { data: user } = useGetIdentity<User>();

  const handleResetPassword = () => {
    setIsLoading(true);
    axiosInstance
      .post(`${API_URL}/users/reset_password`, form.values)
      .then(() => {
        open?.({
          type: "success",
          message: "Reset password successfully!",
        });
        setIsLoading(false);
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

  const handleUpload = (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    axiosInstance
      .post(`${API_URL}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        open?.({
          type: "success",
          message: "Image uploaded successfully!",
        });
        const userString = localStorage.getItem(LOGIN_USER);
        if (userString) {
          const user: User = JSON.parse(userString);
          user.headShotName = resp.data.imageName;
          setHeadShot(user.headShotName);
          const jsonUser = JSON.stringify(user);
          localStorage.setItem(LOGIN_USER, jsonUser);
        }
        setIsLoading(false);
        setOpened(false);
      });
  };

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Title order={4}>Setting</Title>}
      padding="xl"
      size="md"
      position="right"
      zIndex={100000}
    >
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Title order={6}>Upload Profile Image </Title>
      <Divider />
      <FileButton
        onChange={(file: File) => handleUpload(file)}
        accept="image/png,image/jpeg"
      >
        {(props) => (
          <Avatar
            {...props}
            component="a"
            radius="xl"
            src={`${API_URL}/images/${user?.email}/${headShot}`}
            alt="it's me"
            size="xl"
          ></Avatar>
        )}
      </FileButton>

      <Title mt={30} order={6}>
        Reset Password
      </Title>
      <Divider />
      <form
        style={{ marginTop: 10 }}
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
          <Button type="submit" disabled={!form.isValid()}>
            Submit
          </Button>
        </Group>
      </form>
    </Drawer>
  );
};

export default SettingComponent;
