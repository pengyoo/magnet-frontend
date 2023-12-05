import React, { useState } from "react";
import {
  IResourceComponentsProps,
  useGetIdentity,
  useNotification,
  useTranslate,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  ScrollArea,
  Table,
  Pagination,
  Badge,
  ActionIcon,
  Modal,
  Anchor,
  Flex,
  Group,
  useMantineTheme,
} from "@mantine/core";
import {
  List,
  DateField,
  TextField,
  ShowButton,
  DeleteButton,
} from "@refinedev/mantine";
import { Job, MatchIndex, Resume, User } from "../interfaces";
import ResumeComponent from "./ResumeComponent";
import MatchIndexModal from "./modal/MatchIndexModal";
import { useNavigate } from "react-router-dom";
import { randomId, useMediaQuery } from "@mantine/hooks";
import { PiExamFill } from "react-icons/pi";
import { GoIssueClosed } from "react-icons/go";
import { VscError } from "react-icons/vsc";
import axiosInstance, { API_URL } from "../services/axios-instance";

export const JobApplicationListComponent: React.FC<
  IResourceComponentsProps
> = () => {
  const translate = useTranslate();
  const { data: user } = useGetIdentity<User>();
  const navigate = useNavigate();

  const isMobile = useMediaQuery(`(max-width: 750px`);

  const [resume, setResume] = useState<Resume>();
  const [resumeOpened, setResumeOpened] = useState(false);
  const [matchOpened, setMatchOpened] = useState(false);
  const [currentMatchIndex, setCurrentMatchIndex] = useState<MatchIndex>({
    overall: 0,
    major: 0,
    degree: 0,
    skill: 0,
    experience: 0,
    education: 0,
    language: 0,
  });

  // Notification
  const { open } = useNotification();

  const theme = useMantineTheme();

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "job",
        header: translate("Job"),
        accessorKey: "job",
        cell: function render({ getValue }) {
          return user?.role === "ADMIN" ? (
            <Flex gap={5}>
              <Anchor
                onClick={() => navigate(`/jobs/show/${getValue<Job>().id}`)}
              >
                <TextField value={getValue<Job>().title} fw={500} />
              </Anchor>
              |
              <Anchor
                onClick={() =>
                  navigate(`/companies/show/${getValue<Job>().company.id}`)
                }
              >
                <TextField value={getValue<Job>().company.name} fw={500} />
              </Anchor>
            </Flex>
          ) : (
            <TextField value={getValue<Job>().title} fz="md" fw={500} />
          );
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
              {getValue<any>() ? (
                <Badge color="red" style={{ fontSize: 16 }}>
                  {Math.round(getValue<any>().overall * 100) + "%"}
                </Badge>
              ) : (
                "No Data"
              )}
            </Anchor>
          );
        },
      },
      {
        id: "testScore",
        accessorKey: "testScore",
        header: translate("Test Score"),
        cell: function render({ getValue }) {
          return getValue<any>() ? (
            <Badge color="red" style={{ fontSize: 16 }}>
              {getValue<number>().toFixed(2)}
            </Badge>
          ) : (
            "No Data"
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
        accessorKey: "id",
        header: translate("table.actions"),
        cell: function render({ getValue }) {
          return user?.role === "ADMIN" ? (
            <Group spacing="xs" noWrap>
              <ShowButton hideText recordItemId={getValue() as string} />
              <DeleteButton hideText recordItemId={getValue() as string} />
            </Group>
          ) : (
            <Group spacing="xs" noWrap>
              <ActionIcon title="Invite to test">
                <PiExamFill
                  onClick={() => handleTestInvite(getValue() as string)}
                  size={25}
                  color={theme.colors.blue[5]}
                />
              </ActionIcon>
              <ActionIcon title="Accept">
                <GoIssueClosed
                  onClick={() => handleAccept(getValue() as string)}
                  size={25}
                  color={theme.colors.green[5]}
                />
              </ActionIcon>

              <ActionIcon title="Reject">
                <VscError
                  onClick={() => handleReject(getValue() as string)}
                  size={25}
                  color={theme.colors.red[5]}
                />
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
      setFilters,
    },
  } = useTable({
    columns,
  });

  const handleShowResume = (resume: Resume) => {
    setResume(resume);
    setResumeOpened(true);
  };

  const handleTestInvite = (applicationId: string) => {
    axiosInstance
      .post(API_URL + "/cinvitations/" + applicationId)
      .then((resp) => {
        open?.({
          type: "success",
          message: "Invited successfully!",
        });
      })
      .catch((err) => {
        open?.({
          type: "error",
          message: err.message,
        });
      });
  };

  const handleAccept = (applicationId: string) => {
    axiosInstance
      .post(API_URL + "/capplications/accept/" + applicationId)
      .then((resp) => {
        // Refresh Data
        setFilters([
          {
            field: "refresh",
            operator: "contains",
            value: randomId(),
          },
        ]);
        open?.({
          type: "success",
          message: "Successfully accepted this applicant!",
        });
      })
      .catch((err) => {
        open?.({
          type: "error",
          message: err.message,
        });
      });
  };

  const handleReject = (applicationId: string) => {
    axiosInstance
      .post(API_URL + "/capplications/reject/" + applicationId)
      .then((resp) => {
        // Refresh Data
        setFilters([
          {
            field: "refresh",
            operator: "contains",
            value: randomId(),
          },
        ]);
        open?.({
          type: "success",
          message: "Successfully rejected this applicant!",
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

      {/** Display Resume in modal */}
      <Modal
        opened={resumeOpened}
        onClose={() => setResumeOpened(false)}
        title={`${resume?.fullName}'s Resume`}
        size={isMobile ? "100%" : "70%"}
      >
        {resume && <ResumeComponent resume={resume} />}
      </Modal>

      {/** Display Radar Chart in modal for Match Index */}
      <MatchIndexModal
        matchOpened={matchOpened}
        setMatchOpened={setMatchOpened}
        currentMatchIndex={currentMatchIndex}
      />
    </List>
  );
};
