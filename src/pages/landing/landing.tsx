import {
  Container,
  Text,
  Title,
  Group,
  Avatar,
  Image,
  Card,
  Center,
  SimpleGrid,
} from "@mantine/core";
import { Hero } from "./Hero";
import publish from "../../assets/images/publish.jpg";
import match from "../../assets/images/match.jpg";
import test from "../../assets/images/test.jpg";
import { LandingHeader } from "./Header";
import { LandingFooter } from "./Footer";

const LandingPage = () => {
  return (
    <div>
      <LandingHeader />

      <section
        style={{
          marginTop: 150,
          marginBottom: 150,
          backgroundColor: "#f9fafb",
        }}
      >
        <Hero />
      </section>

      <section id="match" style={{ backgroundColor: "#f9fafb", marginTop: 60 }}>
        <Container size="lg">
          <Center my={30}>
            <Title
              style={{
                fontFamily: "Greycliff CF",
                lineHeight: 1.2,
                fontWeight: 900,
                fontSize: "30px",
              }}
            >
              Key Features for Employers
            </Title>
          </Center>
          <SimpleGrid
            cols={3}
            spacing={60}
            breakpoints={[
              { maxWidth: "md", cols: 2, spacing: "md" },
              { maxWidth: "sm", cols: 2, spacing: "sm" },
              { maxWidth: "xs", cols: 1, spacing: "sm" },
            ]}
          >
            <Card withBorder p="xs">
              <Center>
                <Image src={publish} maw="300px" />
              </Center>

              <Text fz="lg" fw={500} mt="md">
                Publish Job
              </Text>
              <Text fz="sm" c="dimmed" mt={5}>
                Start by posting your job openings and let our AI-powered system
                match the right candidates for you.
              </Text>

              <Group mt="md">
                <Avatar.Group spacing="sm">
                  <Avatar radius="xl" />
                  <Avatar radius="xl" />
                  <Avatar radius="xl" />
                  <Avatar radius="xl">+5</Avatar>
                </Avatar.Group>
              </Group>
            </Card>

            <Card withBorder p="xs">
              <Center>
                <Image src={match} maw="300px" />
              </Center>

              <Text fz="lg" fw={500} mt="md">
                Smart Match
              </Text>
              <Text fz="sm" c="dimmed" mt={5}>
                Our smart matching algorithms will find the best candidates that
                fit your job requirements.
              </Text>

              <Group mt="md">
                <Avatar.Group spacing="sm">
                  <Avatar radius="xl" />
                  <Avatar radius="xl" />
                  <Avatar radius="xl" />
                  <Avatar radius="xl">+5</Avatar>
                </Avatar.Group>
              </Group>
            </Card>

            <Card withBorder p="xs">
              <Center>
                <Image src={test} maw="300px" />
              </Center>
              <Text fz="lg" fw={500} mt="md">
                Smart Test
              </Text>
              <Text fz="sm" c="dimmed" mt={5}>
                Create and administer AI-based tests to evaluate candidates and
                make informed hiring decisions.
              </Text>

              <Group mt="md">
                <Avatar.Group spacing="sm">
                  <Avatar radius="xl" />
                  <Avatar radius="xl" />
                  <Avatar radius="xl" />
                  <Avatar radius="xl">+5</Avatar>
                </Avatar.Group>
              </Group>
            </Card>
          </SimpleGrid>
        </Container>
      </section>

      <section id="test" style={{ backgroundColor: "#f5f7fa" }}></section>

      <section id="match" style={{ backgroundColor: "#f9fafb" }}></section>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;
