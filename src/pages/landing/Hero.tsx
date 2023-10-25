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
import { useEffect, useState } from "react";

export function Hero() {
  const [shouldScroll1, setShouldScroll1] = useState(false);
  const [shouldScroll2, setShouldScroll2] = useState(false);

  const scrollToEmployer = () => {
    if (shouldScroll1) {
      const sectionElement = document.getElementById("employer");
      sectionElement?.scrollIntoView({ behavior: "smooth" });
      setShouldScroll1(false);
    }
  };

  const scrollToJobseeker = () => {
    if (shouldScroll2) {
      const sectionElement = document.getElementById("jobseeker");
      sectionElement?.scrollIntoView({ behavior: "smooth" });
      setShouldScroll2(false);
    }
  };

  useEffect(() => {
    scrollToEmployer();
  }, [shouldScroll1]);

  useEffect(() => {
    scrollToJobseeker();
  }, [shouldScroll2]);

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
            <Button
              radius="xl"
              size="md"
              onClick={() => setShouldScroll1(true)}
            >
              I'm an employer
            </Button>
            <Button
              radius="xl"
              size="md"
              color="orange"
              onClick={() => setShouldScroll2(true)}
            >
              I'm a job seeker
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
