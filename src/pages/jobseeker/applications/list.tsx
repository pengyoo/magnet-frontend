import React from "react";
import {
  IResourceComponentsProps,
  useTranslate,
  useMany,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ScrollArea, Table, Pagination, Group, Badge } from "@mantine/core";
import { List, ShowButton, DateField } from "@refinedev/mantine";

export const MyApplicationList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "job",
        header: translate("Job"),
        accessorKey: "job.title",
      },
      {
        id: "company",
        header: translate("Company"),
        accessorKey: "job.company.name",
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
                  : getValue<string>() === "PENDING_REVIEW"
                  ? "blue"
                  : "red"
              }
            >
              {getValue<string>()}
            </Badge>
          );
        },
      },

      // {
      //   id: "actions",
      //   accessorKey: "id",
      //   header: translate("table.actions"),
      //   cell: function render({ getValue }) {
      //     return (
      //       <Group spacing="xs" noWrap>
      //         <ShowButton hideText recordItemId={getValue() as string} />
      //       </Group>
      //     );
      //   },
      // },
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
    </List>
  );
};
