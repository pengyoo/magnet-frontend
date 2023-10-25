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
  Badge,
  Affix,
  Transition,
  Button,
  Blockquote,
  Stack,
  Divider,
  Anchor,
  Flex,
} from "@mantine/core";
import { Hero } from "./Hero";
import publish from "../../assets/images/publish.jpg";
import match from "../../assets/images/match.jpg";
import test from "../../assets/images/test.jpg";
import weAreRecruiting from "../../assets/images/we-are-recruiting.jpg";
import { LandingHeader } from "./Header";
import { LandingFooter } from "./Footer";
import { IconArrowUp } from "@tabler/icons";
import { useWindowScroll } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const avatars = [
  "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
];

const LandingPage = () => {
  const [scroll, scrollTo] = useWindowScroll();

  const navigate = useNavigate();

  return (
    <>
      <LandingHeader />

      <section
        style={{
          marginTop: 120,
          backgroundColor: "#f9fafb",
        }}
      >
        <Hero />
      </section>

      <div id="employer"></div>
      <section style={{ backgroundColor: "#f9fafb", marginTop: 80 }}>
        <Container size="lg">
          <Flex justify="center" gap={20} my={30} align="center">
            <Title
              style={{
                fontFamily: "Greycliff CF",
                lineHeight: 1.2,
                fontWeight: 900,
                fontSize: "30px",
              }}
            >
              Key Features for Employers...
            </Title>
            <Button variant="outline" onClick={() => navigate("/register")}>
              Get Started
            </Button>
          </Flex>
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
                Start by posting your job openings and match the right
                candidates for you.
              </Text>
              <Group mt="md">
                <Badge>Efficiency</Badge>
                <Badge color="red">Quality</Badge>
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
                <Badge>AI Powered</Badge>
                <Badge color="red">Candidate Insights</Badge>
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
                <Badge>Automated Testing</Badge>
                <Badge color="red">Automated Scoring</Badge>
              </Group>
            </Card>
          </SimpleGrid>
        </Container>
      </section>
      <div id="jobseeker"></div>
      <section style={{ backgroundColor: "#f5f7fa", marginTop: 80 }}>
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
              Job Seekers: Explore loads of oppotunities!
            </Title>
          </Center>

          <SimpleGrid
            cols={2}
            spacing={60}
            breakpoints={[
              { maxWidth: "md", cols: 2, spacing: "md" },
              { maxWidth: "sm", cols: 2, spacing: "sm" },
              { maxWidth: "xs", cols: 1, spacing: "sm" },
            ]}
          >
            <Image src={weAreRecruiting} />
            <Stack>
              <Blockquote cite="– Forrest Gump">
                With this recruitment system, it feels like the haystack has
                turned into a treasure chest.
              </Blockquote>

              <Blockquote cite="– Peng Yu">
                Thanks to this recruitment system, I receive job opportunities
                that align with my skills and career goals.
              </Blockquote>

              <Group mt={10}>
                <Button
                  radius="xl"
                  size="md"
                  color="orange"
                  onClick={() => navigate("/register")}
                >
                  Build Resume
                </Button>
              </Group>
            </Stack>
          </SimpleGrid>
        </Container>
      </section>
      <Divider variant="dashed" mt={80} />
      <LandingFooter />

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftIcon={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default LandingPage;
