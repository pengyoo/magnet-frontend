import { Card, Title } from "@mantine/core";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  smooth: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

import axiosInstance, { API_URL } from "../../../services/axios-instance";

export function OverviewCard() {
  const [data, setData] = useState({ labels: [], datasets: [] });
  useEffect(() => {
    axiosInstance
      .get(`${API_URL}/stats/linear`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Card
      radius="md"
      w="100%"
      h="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Title order={5}>Overview</Title>
      <Line options={options} data={data} />
    </Card>
  );
}
