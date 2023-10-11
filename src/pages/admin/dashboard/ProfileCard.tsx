"use client";

import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Flex,
  Group,
  Menu,
  Space,
  Stack,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { useGetIdentity } from "@refinedev/core";
import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons-react";

const useStyle = createStyles((theme) => ({
  section: {
    padding: theme.spacing.md,
    borderTop: `1 solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function ProfileCard() {
  const { classes } = useStyle();
  const { data } = useGetIdentity();

  return (
    <Card radius="md">
      <Card.Section className={classes.section}>
        <Group position="apart">
          <Avatar radius="xl"></Avatar>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconFileZip size={14} />}>Action One</Menu.Item>
              <Menu.Item icon={<IconEye size={14} />}>Action Two</Menu.Item>
              <Menu.Item icon={<IconTrash size={14} />} color="red">
                Action Three
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Space h="md" />

        <Flex direction="column">
          <Title order={5}>{data?.name}</Title>
          <Space h="xs" />
          <Text fz="sm" c="dimmed" fw="500">
            {data?.profile}
          </Text>
          <Space h="4" />
          <Text fz="sm" c="dimmed" fw="500">
            {data?.email}
          </Text>
        </Flex>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group position="apart" grow>
          <Stack spacing={4}>
            <Text fz="sm" fw="500">
              Role
            </Text>
            <Title order={3}>User</Title>
          </Stack>
          <Stack spacing={4}>
            <Text fz="sm" fw="500">
              Last login time
            </Text>
            <Title order={3}>9/9/2023 23:12</Title>
          </Stack>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group position="center">
          <Button>Account</Button>
          <Button>System</Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
