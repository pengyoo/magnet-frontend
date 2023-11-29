import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Container,
  createStyles,
  Radio,
  Title,
  Card,
  Space,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {
  useNotification,
  useRouterContext,
  useRouterType,
} from "@refinedev/core";
import { CSSProperties } from "react";
import { ThemedTitle, ThemedTitleV2 } from "@refinedev/mantine";
import axiosInstance, { API_URL } from "../../services/axios-instance";
import { User } from "../../interfaces";

import { useNavigate } from "react-router-dom";
import { GiMagnet } from "react-icons/gi";

const useStyles = createStyles(() => ({
  loginBox: {
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export const titleStyles: CSSProperties = {
  textAlign: "center",
  fontSize: "26px",
  fontWeight: 700,
};

const pageTitleStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "32px",
  fontSize: "22px",
  fontWeight: 700,
};

const cardStyles: CSSProperties = {
  width: "400px",
  padding: "32px",
  boxShadow:
    "0px 17px 17px -7px rgba(0, 0, 0, 0.16), 0px 36px 28px -7px rgba(0, 0, 0, 0.2), 0px 1px 3px rgba(0, 0, 0, 0.2)",
};

export function Register() {
  const { classes } = useStyles();

  const routerType = useRouterType();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const navigate = useNavigate();
  const { open } = useNotification();

  const form = useForm({
    initialValues: {
      email: "",
      role: "COMPANY",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 8 ? "Password should include at least 8 characters" : null,
    },
  });

  // Sign up
  const signup = async (user: User) => {
    axiosInstance
      .post(`${API_URL}/users/register`, user)
      .then(() => {
        open?.({
          type: "success",
          message: "Successfully Signed Up. Please Login.",
        });
        navigate("/login");
      })
      .catch((err) => {
        open?.({
          type: "error",
          message: err.message,
        });
      });
  };
  return (
    <Container maw="25rem" className={classes.loginBox}>
      <div style={pageTitleStyles}>
        <ThemedTitleV2
          collapsed={false}
          text="Magnet"
          icon={<GiMagnet size={30} />}
        />
      </div>
      <Card style={cardStyles}>
        <Title style={titleStyles} color={"brand.8"}>
          Sign up
        </Title>

        <Space h="sm" />
        <Space h="lg" />

        <form
          onSubmit={form.onSubmit((values) => {
            signup(values as User);
            console.log(values);
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 8 characters"
              }
              radius="md"
            />

            <Radio.Group
              name="role"
              label="Select your account type"
              onChange={(value) => form.setFieldValue("role", value)}
              withAsterisk
              value={form.values.role}
            >
              <Group mt="xs">
                <Radio label="Company" value="COMPANY" />
                <Radio checked label="Job Seeker" value="JOB_SEEKER" />
              </Group>
            </Radio.Group>

            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          </Stack>

          <Stack mt="xl">
            <Button type="submit" radius="xl">
              Register
            </Button>
            <Text mt="md" size="xs" align="center">
              Already have an account?{" "}
              <Anchor component={ActiveLink as any} to="/login" weight={700}>
                Login
              </Anchor>
            </Text>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
