import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  Flex,
  Stack,
  SimpleGrid,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import banner from "../../assets/images/landing-page-banner.jpg";

export function Hero() {
  return (
    <Container size="lg">
      <SimpleGrid
        cols={2}
        spacing="lg"
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
      >
        <Stack>
          <Title
            style={{
              fontFamily: "Greycliff CF",
              lineHeight: 1.2,
              fontWeight: 1300,
              fontSize: "44px",
            }}
          >
            Magnet <br />
            AI Recruitment System
          </Title>
          <Text c="dimmed" mt={30}>
            Tired of sifting through countless resumes and struggling to find
            the perfect candidate? Say hello to the future of recruitment with
            our AI-Powered Recruitment System.
          </Text>

          <Group mt={30}>
            <Button radius="xl" size="md">
              Get started
            </Button>
          </Group>
        </Stack>
        <Stack>
          <Image src={banner} />
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
