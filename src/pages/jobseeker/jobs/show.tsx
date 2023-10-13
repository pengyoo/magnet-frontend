import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import { Show, TextField, MarkdownField } from "@refinedev/mantine";
import {
  Title,
  Flex,
  Group,
  Box,
  Text,
  Grid,
  Card,
  Affix,
  Button,
} from "@mantine/core";

export const Jobseeker_JobShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Grid>
        <Grid.Col sm={12} md={12} lg={9}>
          <Card withBorder>
            <Flex>
              <Group style={{ flex: 1 }}>
                <Text my="xs">Title: </Text>
                <TextField
                  style={{ fontSize: 18, fontWeight: "bold" }}
                  value={record?.title}
                />
              </Group>

              <Group style={{ flex: 1 }}>
                <Text my="xs">Company: </Text>
                <TextField
                  style={{ fontSize: 18, fontWeight: "bold" }}
                  value={record?.company?.name}
                />
              </Group>
            </Flex>

            <Flex>
              <Group style={{ flex: 1 }}>
                <Text my="xs">Salary Range: </Text>
                <TextField
                  style={{ fontSize: 18, fontWeight: "bold" }}
                  value={record?.salaryRange}
                />
              </Group>

              <Group style={{ flex: 1 }}>
                <Text my="xs">Location: </Text>
                <TextField
                  style={{ fontSize: 18, fontWeight: "bold" }}
                  value={record?.location}
                />
              </Group>
            </Flex>

            <Title mt="xs" order={5}>
              Job Description:
            </Title>
            <MarkdownField value={record?.description} />
          </Card>
        </Grid.Col>
        <Grid.Col sm={12} md={12} lg={3}>
          <Affix position={{ bottom: 100, right: 100 }}>
            <Button>Apply Now</Button>
          </Affix>
        </Grid.Col>
      </Grid>
    </Show>
  );
};
