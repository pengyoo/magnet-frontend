import React, { useState } from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  ScrollArea,
  Table,
  Pagination,
  Group,
  Badge,
  ActionIcon,
  Modal,
  Anchor,
  Progress,
  Text,
} from "@mantine/core";
import { List, DateField, TextField } from "@refinedev/mantine";
import { useNavigate } from "react-router-dom";
import { Resume } from "../../../interfaces";
import { IconVaccine } from "@tabler/icons";
import ResumeComponent from "../../../components/ResumeComponent";
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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const CApplicationList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const navigate = useNavigate();

  const [resume, setResume] = useState<Resume>();
  const [resumeOpened, setResumeOpened] = useState(false);
  const [matchOpened, setMatchOpened] = useState(false);
  const [currentMatchIndex, setCurrentMatchIndex] = useState({
    overall: 0,
    major: 0,
    degree: 0,
    skill: 0,
    experience: 0,
    education: 0,
    language: 0,
  });

  const handleShowResume = (resume: Resume) => {
    setResume(resume);
    setResumeOpened(true);
  };

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "job",
        header: translate("Job"),
        accessorKey: "job.title",
        cell: function render({ getValue }) {
          return <TextField value={getValue() as string} fz="md" fw={500} />;
        },
      },
      {
        id: "resume",
        header: translate("Applicant"),
        accessorKey: "resume",
        cell: function render({ getValue }) {
          return (
            <Anchor onClick={() => handleShowResume(getValue<Resume>())}>
              {" "}
              {getValue<Resume>().fullName}
            </Anchor>
          );
        },
      },
      {
        id: "appliedDate",
        accessorKey: "appliedDate",
        header: translate("Applied Date"),
        cell: function render({ getValue }) {
          return <DateField value={getValue<any>()} />;
        },
      },
      {
        id: "matchingIndex",
        accessorKey: "matchingIndex",
        header: translate("Match Index"),
        cell: function render({ getValue }) {
          return (
            <Anchor
              onClick={() => {
                setCurrentMatchIndex(getValue<any>());
                setMatchOpened(true);
              }}
            >
              <Badge color="red" style={{ fontSize: 16 }}>
                {getValue<any>()
                  ? getValue<any>().overall * 100 + "%"
                  : "No Data"}
              </Badge>
            </Anchor>
          );
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: translate("Status"),
        cell: function render({ getValue }) {
          return (
            <Badge
              color={
                getValue<string>() === "ACCEPTED"
                  ? "green"
                  : getValue<string>() === "PENDING"
                  ? "blue"
                  : "red"
              }
            >
              {getValue<string>()}
            </Badge>
          );
        },
      },

      {
        id: "actions",
        accessorKey: "resume",
        header: translate("table.actions"),
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              <ActionIcon onClick={() => handleShowResume(getValue<Resume>())}>
                <IconVaccine />
              </ActionIcon>
            </Group>
          );
        },
      },
    ],
    [translate]
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
  });

  return (
    <List>
      <ScrollArea>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ScrollArea>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
      <Modal
        opened={resumeOpened}
        onClose={() => setResumeOpened(false)}
        title={`${resume?.fullName}'s Resume`}
        size="70%"
      >
        {resume && <ResumeComponent resume={resume} />}
      </Modal>

      <Modal
        title={
          <Text style={{ fontSize: 25, fontWeight: 500 }}>Match Index</Text>
        }
        pt="0"
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
                borderWidth: 1,
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
              color: "pink",
              label: "Overall:" + currentMatchIndex.overall * 100 + "%",
            },
          ]}
        />
      </Modal>
    </List>
  );
};
