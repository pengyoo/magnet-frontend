"use client";

import { Grid } from "@mantine/core";
import { StatsData, StatsGroup } from "./StatsGroup";
import { OverviewCard } from "./OverviewCard";

import { useEffect, useState } from "react";
import ResumeForm from "../../jobseeker/resume/form";
import { useGetIdentity } from "@refinedev/core";
import { User } from "../../../interfaces";
import CompanyForm from "../../company/company/form";
import axiosInstance, { API_URL } from "../../../services/axios-instance";

export function DashboardContent() {
  useEffect(() => {
    axiosInstance
      .get(`${API_URL}/stats`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { data: user } = useGetIdentity<User>();
  const [data, setData] = useState<StatsData[]>();

  const adminDashboard = (
    <Grid>
      <Grid.Col sm={12} md={12} lg={11}>
        {data && <StatsGroup data={data} />}
      </Grid.Col>

      <Grid.Col sm={12} md={12} lg={11}>
        <OverviewCard />
      </Grid.Col>
    </Grid>
  );

  const jobSeekerDashboard = <ResumeForm />;

  const companyDashboard = <CompanyForm />;

  if (user?.role === "ADMIN") {
    return adminDashboard;
  }

  if (user?.role === "JOB_SEEKER") {
    return jobSeekerDashboard;
  }

  return companyDashboard;
}
