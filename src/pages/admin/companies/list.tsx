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
  TextField,
} from "@refinedev/mantine";

export const CompanyList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: translate("ID"),
      },
      {
        id: "name",
        accessorKey: "name",
        header: translate("Company Name"),
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
        id: "address",
        accessorKey: "address",
        header: translate("Address"),
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
