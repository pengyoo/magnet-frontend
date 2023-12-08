import {
  IResourceComponentsProps,
  useNotification,
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
  Indicator,
  Spoiler,
} from "@mantine/core";
import { BsCurrencyExchange } from "react-icons/bs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axiosInstance, { API_URL } from "../../../services/axios-instance";
dayjs.extend(relativeTime);

export const Jobseeker_JobShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const theme = useMantineTheme();

  const { open } = useNotification();

  // Apply Job
  const handleApply = () => {
    axiosInstance
      .post(`${API_URL}/sapplications/apply/${record?.id}`)
      .then(() => {
        open?.({
          type: "success",
          message: "Successfully Applied.",
        });
      })
      .catch((err) => {
        open?.({
          type: "error",
          message: err.message,
        });
      });
  };

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
                {record?.company?.logoUrl && (
                  <Image
                    src={`${API_URL}${record?.company?.logoUrl}`}
                    width={60}
                  />
                )}
              </Flex>
              <Divider />
              <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                <MarkdownField value={record?.company?.description} />
              </Spoiler>
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
      <Affix position={{ bottom: 100, right: 250 }}>
        <Button onClick={handleApply}>Apply Now</Button>
      </Affix>
    </Show>
  );
};
