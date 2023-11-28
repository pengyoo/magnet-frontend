import { Card, Group, SimpleGrid, Text, useMantineTheme } from "@mantine/core";

interface StatsGroupProps {
  data: StatsData[];
}

export interface StatsData {
  title: string;
  value: string;
  diff: number;
}

export function StatsGroup({ data }: StatsGroupProps) {
  const theme = useMantineTheme();
  const stats = data.map((stat) => {
    return (
      <Card key={stat.title} p="md" radius="md">
        <Group position="apart">
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
        </Group>
      </Card>
    );
  });

  return (
    <SimpleGrid cols={5} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      {stats}
    </SimpleGrid>
  );
}
