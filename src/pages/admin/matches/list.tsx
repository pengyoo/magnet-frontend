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
  Badge,
} from "@mantine/core";
import {
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  TextField,
} from "@refinedev/mantine";
import { Link, useNavigate } from "react-router-dom";
import { Job, Resume } from "../../../interfaces";

export const MatchingIndexList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const navigate = useNavigate();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "job",
        accessorKey: "job",
        header: translate("Job Title"),
        cell: function render({ getValue }) {
          return (
            <Anchor
              onClick={() => navigate(`/jobs/show/${(getValue() as Job).id}`)}
            >
              <TextField value={(getValue() as Job).title} />
            </Anchor>
          );
        },
      },
      {
        id: "resume",
        accessorKey: "resume",
        header: translate("Job Seeker"),
        cell: function render({ getValue }) {
          return (
            <Anchor
              onClick={() =>
                navigate(`/resumes/show/${(getValue() as Resume).id}`)
              }
            >
              <TextField value={(getValue() as Resume).fullName} />
            </Anchor>
          );
        },
      },

      {
        id: "degree",
        accessorKey: "degree",
        header: translate("Degree Match"),
      },
      {
        id: "major",
        accessorKey: "major",
        header: translate("Major Match"),
      },
      {
        id: "experience",
        accessorKey: "experience",
        header: translate("Experience Match"),
      },
      {
        id: "skill",
        accessorKey: "skill",
        header: translate("Skill Match"),
      },
      {
        id: "language",
        accessorKey: "language",
        header: translate("Language Match"),
      },
      {
        id: "overall",
        accessorKey: "overall",
        header: translate("Overall Match"),
        cell: function render({ getValue }) {
          return (
            <Badge color="red" style={{ fontSize: 16 }}>
              {getValue<any>() ? getValue<any>() : "No Data"}
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
