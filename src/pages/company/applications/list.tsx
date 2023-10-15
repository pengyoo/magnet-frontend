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
} from "@mantine/core";
import { List, DateField } from "@refinedev/mantine";
import { useNavigate } from "react-router-dom";
import { Resume } from "../../../interfaces";
import { IconVaccine } from "@tabler/icons";
import ResumeShow from "../resume/show";

export const CApplicationList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const navigate = useNavigate();

  const [resume, setResume] = useState<Resume>();
  const [opened, setOpened] = useState(false);

  const handleShowResume = (resume: Resume) => {
    setResume(resume);
    setOpened(true);
  };

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "job",
        header: translate("Job"),
        accessorKey: "job.title",
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
        opened={opened}
        onClose={() => setOpened(false)}
        title={`${resume?.fullName}'s Resume`}
        size="70%"
      >
        {resume && <ResumeShow resume={resume} />}
      </Modal>
    </List>
  );
};
