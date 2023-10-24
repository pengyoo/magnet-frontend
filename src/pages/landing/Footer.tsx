import {
  Text,
  Container,
  ActionIcon,
  Group,
  SimpleGrid,
  Flex,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "../../css/FooterLinks.module.css";
import { GiMagnet } from "react-icons/gi";

export function LandingFooter() {
  const theme = useMantineTheme();
  return (
    <footer
      className={classes.footer}
      style={{ marginTop: 80, marginBottom: 20 }}
    >
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Flex gap={5} mb={10}>
            <GiMagnet size={40} color={theme.colors.blue[5]} />
            <Title color={theme.colors.blue[5]}>Magnet</Title>
          </Flex>

          <Text size="xs" c="dimmed" className={classes.description}>
            High speed, low cost, right people! Magnet, an AI powered intellgent
            recruitment system!
          </Text>
        </div>
        <Text className={classes.title}>Follow Us</Text>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2023 Magnet All rights reserved.
        </Text>

        <Group>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter
              style={{ width: "18rem", height: "18rem" }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube
              style={{ width: "18rem", height: "18rem" }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram
              style={{ width: "18rem", height: "18rem" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
