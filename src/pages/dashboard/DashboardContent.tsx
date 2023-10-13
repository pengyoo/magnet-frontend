"use client";

import { Flex, Grid, Text } from "@mantine/core";
import { StatsGroup } from "../admin/dashboard/StatsGroup";
import { mockData } from "../admin/dashboard/mock";
import { BalanceCard } from "../admin/dashboard/BalanceCard";
import { OverviewCard } from "../admin/dashboard/OverviewCard";
import { ProfileCard } from "../admin/dashboard/ProfileCard";
import { WelcomeCard } from "../admin/dashboard/WelcomeCard";

import { useEffect } from "react";
import ResumeForm from "../jobseeker/resume/form";
import { useGetIdentity } from "@refinedev/core";
import { User } from "../../interfaces";

export function DashboardContent() {
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

  const { data: user } = useGetIdentity<User>();

  const adminDashboard = (
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

  const jobSeekerDashboard = <ResumeForm />;

  const companyDashboard = <Text>Company</Text>;

  if (user?.role === "ADMIN") {
    return adminDashboard;
  }

  if (user?.role === "JOB_SEEKER") {
    return jobSeekerDashboard;
  }

  return companyDashboard;
}
