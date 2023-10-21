import { Modal, Progress, Text } from "@mantine/core";
import React, { useState } from "react";
import { Radar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { MatchIndex } from "../../interfaces";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Props {
  currentMatchIndex: MatchIndex;
  matchOpened: boolean;
  setMatchOpened: (matchOpened: boolean) => void;
}

const MatchIndexModal = ({
  currentMatchIndex,
  matchOpened,
  setMatchOpened,
}: Props) => {
  return (
    <Modal
      title={<Text style={{ fontSize: 25, fontWeight: 500 }}>Match Index</Text>}
      pt="0"
      px="lg"
      pb="lg"
      opened={matchOpened}
      onClose={() => setMatchOpened(false)}
    >
      <Radar
        data={{
          labels: ["Degree", "Major", "Skills", "Experience", "Language"],
          datasets: [
            {
              label: "Match Index (0-100)",
              data: [
                currentMatchIndex.degree * 100,
                currentMatchIndex.major * 100,
                currentMatchIndex.skill * 100,
                currentMatchIndex.experience * 100,
                currentMatchIndex.language * 100,
              ],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
            },
          ],
        }}
        options={{
          scales: {
            r: {
              min: 0,
              max: 100,
            },
          },
        }}
      />
      <Progress
        radius="xl"
        size={24}
        my="lg"
        sections={[
          {
            value: currentMatchIndex.overall * 100,
            color: "red",
            label: "Overall:" + currentMatchIndex.overall * 100,
          },
        ]}
      />
      <Text style={{ fontSize: 12, fontWeight: "bold", color: "gray" }}>
        Note:
      </Text>
      <Text style={{ fontSize: 12, color: "gray" }}>
        degree + major + language = 20%, skills = 40%, experience = 40%
      </Text>
    </Modal>
  );
};

export default MatchIndexModal;
