"use client";

import { Flex, Grid } from "@mantine/core";
import { StatsGroup } from "./StatsGroup";
import { mockData } from "./mock";
import { BalanceCard } from "./BalanceCard";
import { OverviewCard } from "./OverviewCard";
import { ProfileCard } from "./ProfileCard";
import { WelcomeCard } from "./WelcomeCard";

import axiosInstance, { API_URL } from "../../services/axios-instance";
import { useEffect, useState } from "react";

export function DashboardContent() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // axiosInstance
    //   .get(`${API_URL}/stats`)
    //   .then((res) => {
    //     setData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);
  return (
    <Grid>
      <Grid.Col sm={12} md={12} lg={4}>
        <ProfileCard />
      </Grid.Col>
      <Grid.Col sm={12} md={12} lg={8}>
        <Flex direction="column" h="100%" justify="space-between" gap="md">
          <WelcomeCard />
          <StatsGroup data={mockData} />
        </Flex>
      </Grid.Col>

      <Grid.Col sm={12} md={12} lg={8}>
        <OverviewCard />
      </Grid.Col>
      <Grid.Col sm={12} md={12} lg={4}>
        <BalanceCard />
      </Grid.Col>
    </Grid>
  );
}
