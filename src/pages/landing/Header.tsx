import {
  Container,
  Text,
  Button,
  useMantineTheme,
  Flex,
  Box,
  Title,
  Anchor,
  MediaQuery,
} from "@mantine/core";
import { GiMagnet } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export const LandingHeader = () => {
  const theme = useMantineTheme();

  const navigate = useNavigate();

  return (
    <header
      style={{
        backgroundColor: theme.colors.blue[5],
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 99,
      }}
    >
      <Container size="lg" py={5}>
        <Flex justify="space-between" align="center">
          <Flex gap={10} justify="space-between" align="baseline">
            <Anchor
              style={{
                display: "flex",
                color: "white",
                alignContent: "center",
                alignItems: "baseline",
              }}
            >
              <GiMagnet size={40} />
              <Title order={2}>Magnet</Title>
            </Anchor>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <Text
                ml={20}
                style={{ fontFamily: "'Caveat', cursive", fontSize: 20 }}
              >
                An AI powered smart recruitment system!
              </Text>
            </MediaQuery>
          </Flex>
          <Box>
            <Flex gap={10} justify="space-between" align="center">
              <Anchor
                onClick={() => navigate("/login")}
                style={{ color: "white" }}
              >
                Login
              </Anchor>
              <Button variant="light" onClick={() => navigate("/register")}>
                Sign up Free
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </header>
  );
};
