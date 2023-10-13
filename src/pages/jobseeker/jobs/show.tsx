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
  Divider,
  useMantineTheme,
  Image,
} from "@mantine/core";
import { BsCurrencyExchange } from "react-icons/bs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const Jobseeker_JobShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const theme = useMantineTheme();

  return (
    <Show isLoading={isLoading}>
      <Grid>
        <Grid.Col sm={12} md={12} lg={8}>
          <Card withBorder>
            <TextField
              style={{ fontSize: 18, fontWeight: "bold" }}
              value={record?.title}
            />
            <Flex my="xs">
              <BsCurrencyExchange color={theme.colors.dark[3]} />
              <TextField mx={5} size={14} value={record?.salaryRange} /> ·
              <TextField mx={5} size={14} value={record?.location} /> ·
              <TextField
                mx={5}
                size={14}
                value={dayjs(record?.createdAt).fromNow()}
              />
            </Flex>

            <Divider />
            <Title mt="xs" order={5}>
              Job Description:
            </Title>
            <MarkdownField value={record?.description} />
          </Card>
        </Grid.Col>
        <Grid.Col sm={12} md={12} lg={4}>
          <Card withBorder>
            <Box>
              <Flex justify="space-between">
                <Box>
                  <TextField
                    style={{ fontSize: 18, fontWeight: "bold" }}
                    value={record?.company?.name}
                  />

                  <Flex align="center" mt="md" mb="md" justify="flex-start">
                    <TextField
                      size={14}
                      value={record?.company?.industry}
                      mr={5}
                    />
                    ·
                    <TextField
                      size={14}
                      value={`${record?.company?.scale} employees`}
                      mx={5}
                    />
                    ·
                    <TextField
                      size={14}
                      value={`${record?.company?.city}`}
                      mx={5}
                    />
                    ,
                    <TextField
                      size={14}
                      value={`${record?.company?.country}`}
                      mx={5}
                    />
                  </Flex>
                </Box>
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                  width={50}
                />
              </Flex>
              <Divider />
              <MarkdownField value={record?.company?.description} />
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
      <Affix position={{ bottom: 100, right: 250 }}>
        <Button>Apply Now</Button>
      </Affix>
    </Show>
  );
};
