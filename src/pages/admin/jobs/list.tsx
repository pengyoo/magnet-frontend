import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ScrollArea, Table, Pagination, Group } from "@mantine/core";
import {
  List,
  EditButton,
  ShowButton,
  MarkdownField,
  DateField,
  TextField,
} from "@refinedev/mantine";
import { Link } from "react-router-dom";
import { Company } from "../../../interfaces";

export const JobList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: translate("ID"),
      },
      {
        id: "title",
        accessorKey: "title",
        header: translate("Title"),
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
      },
      {
        id: "company",
        header: translate("Company Name"),
        accessorKey: "company",
        cell: function render({ getValue }) {
          return (
            <Link to={`/companies/show/${(getValue() as Company).id}`}>
              <TextField value={(getValue() as Company).name} />
            </Link>
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
              <ShowButton hideText recordItemId={getValue() as string} />
              <EditButton hideText recordItemId={getValue() as string} />
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
    </List>
  );
};
