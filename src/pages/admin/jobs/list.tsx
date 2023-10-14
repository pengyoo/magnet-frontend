import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  ScrollArea,
  Table,
  Pagination,
  Group,
  Anchor,
  Button,
  Badge,
} from "@mantine/core";
import {
  List,
  EditButton,
  ShowButton,
  MarkdownField,
  DateField,
  TextField,
  DeleteButton,
  CreateButton,
} from "@refinedev/mantine";
import { Link, useNavigate } from "react-router-dom";
import { Company, Job } from "../../../interfaces";

export const JobList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const navigate = useNavigate();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "title",
        accessorKey: "title",
        header: translate("Title"),
        cell: function render({ getValue }) {
          return <TextField value={getValue() as string} fz="md" fw={500} />;
        },
      },
      {
        id: "description",
        accessorKey: "description",
        header: translate("Description"),
        cell: function render({ getValue }) {
          return (
            <MarkdownField value={getValue<string>()?.slice(0, 80) + "..."} />
          );
        },
      },
      {
        id: "salaryRange",
        accessorKey: "salaryRange",
        header: translate("Salary Range"),
      },
      {
        id: "location",
        accessorKey: "location",
        header: translate("Location"),
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: translate("Created At"),
        cell: function render({ getValue }) {
          return <DateField value={getValue<any>()} />;
        },
      },
      {
        id: "expireAt",
        accessorKey: "expireAt",
        header: translate("Expire At"),
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
                getValue<string>() === "ACTIVE"
                  ? "green"
                  : getValue<string>() === "PAUSED"
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
        id: "company",
        header: translate("Company Name"),
        accessorKey: "company",
        cell: function render({ getValue }) {
          return (
            // <Anchor
            //   onClick={() => {
            //     navigate(`/companies/show/${(getValue() as Company).id}`);
            //   }}
            // >
            <TextField value={(getValue() as Company).name} />
            // </Anchor>
          );
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: translate("table.actions"),
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              <EditButton hideText recordItemId={getValue() as string} />
              <DeleteButton hideText recordItemId={getValue() as string} />
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
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <List headerButtons={<CreateButton>Post a Job</CreateButton>}>
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
    </List>
  );
};
