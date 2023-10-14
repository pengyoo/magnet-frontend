import {
  Card,
  Avatar,
  Text,
  Progress,
  Badge,
  Group,
  ActionIcon,
  Anchor,
  Flex,
  Button,
} from "@mantine/core";

import { IconCalendar, IconUpload } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const avatars = [
  "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
];
interface Props {
  id: string;
  title: string;
  company: string;
  expireAt: Date;
  createdAt: Date;
  description: string;
}

export default function JobCard({
  id,
  title,
  company,
  createdAt,
  expireAt,
  description,
}: Props) {
  const navigate = useNavigate();

  return (
    <Card withBorder p="lg" miw={190} maw={270}>
      <Group>
        <Badge color="orange">
          {dayjs(expireAt).diff(new Date(), "days")} days left
        </Badge>
      </Group>

      <Text fz="lg" fw={500} mt="md">
        <Anchor onClick={() => navigate(`/sjobs/show/${id}`)}>{title}</Anchor>
      </Text>
      <Text fz="md" fw={400} mt="xs">
        {company}
      </Text>
      <Text fz="sm" c="dimmed" mt={5}>
        {description}
      </Text>
      <Flex justify="end" mt={"md"}>
        <Button onClick={() => navigate(`/sjobs/show/${id}`)} variant="outline">
          More...
        </Button>
      </Flex>

      {/* <Group mt="md">
        <Avatar.Group spacing="sm">
          <Avatar src={avatars[0]} radius="xl" />
          <Avatar src={avatars[1]} radius="xl" />
          <Avatar src={avatars[2]} radius="xl" />
          <Avatar radius="xl">+5</Avatar>
        </Avatar.Group>
        <ActionIcon variant="default" size="lg" radius="md">
          <IconUpload size="1.1rem" />
        </ActionIcon>
      </Group> */}
    </Card>
  );
}
