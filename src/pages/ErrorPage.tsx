import { Title, Text, Button, Container, Group, Center } from "@mantine/core";
import classes from "../css/ErrorPage.module.css";
import { useNavigate } from "react-router-dom";

export function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Container size="lg" p={100}>
      <Center>
        <Text
          style={{ fontFamily: "fantasy", fontSize: 120, color: "lightgray" }}
        >
          404
        </Text>
      </Center>
      <Title>You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center">
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group>
        <Button variant="subtle" size="md" onClick={() => navigate("/")}>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
