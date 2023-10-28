import React, { useState } from "react";
import {
  IResourceComponentsProps,
  useNotification,
  useTranslate,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  ScrollArea,
  Table,
  Pagination,
  Group,
  Badge,
  ActionIcon,
  useMantineTheme,
  Modal,
  Paper,
  Stack,
  Button,
  TextInput,
  NumberInput,
} from "@mantine/core";
import {
  List,
  EditButton,
  DateField,
  TextField,
  DeleteButton,
  CreateButton,
} from "@refinedev/mantine";
import { useNavigate } from "react-router-dom";
import { BsQuestionSquare } from "react-icons/bs";
import { useForm } from "@mantine/form";
import axiosInstance, { API_URL } from "../../../services/axios-instance";

export const CJobList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const { open } = useNotification();

  const handleOpenModal = (jobId: string) => {
    setOpened(true);
    form.setFieldValue("jobId", jobId);
  };

  //Call backend API to generate questions
  const handleGenerateQuestions = () => {
    axiosInstance.post(API_URL + "/papers/generate", form.values);

    setOpened(false);
    open?.({
      type: "success",
      message:
        "The test will be generated in about 3 minutes. Please chech the in the assessment -> test",
    });
  };

  const form = useForm({
    initialValues: {
      generalNumber: 0,
      languageNumber: 0,
      language: "",
      jobId: "",
    },

    validate: {
      generalNumber: (value) =>
        value === 0 ? "General Question Number can not be 0" : null,
      languageNumber: (value) =>
        value === 0
          ? "Programming Language Question Number can not be 0"
          : null,
      language: (value) =>
        value.length === 0
          ? "Main Programming Language can not be empty"
          : null,
    },
  });

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
        id: "actions",
        accessorKey: "id",
        header: translate("table.actions"),
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              <ActionIcon
                title="Generate questions using AI"
                onClick={() => handleOpenModal(getValue() as string)}
              >
                <BsQuestionSquare size={28} color={theme.colors.blue[5]} />
              </ActionIcon>
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

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Generate Interview Questions"
      >
        <form onSubmit={form.onSubmit(handleGenerateQuestions)}>
          <Stack>
            <NumberInput
              label="General Question Number"
              placeholder="General Question Number"
              {...form.getInputProps("generalNumber")}
            />

            <NumberInput
              label="Programming Language Question Number"
              placeholder="Programming Language Question Number"
              {...form.getInputProps("languageNumber")}
            />

            <TextInput
              label="Main Programming Language"
              placeholder="Main Programming Language"
              {...form.getInputProps("language")}
            />
            <Button type="submit">Generate</Button>
          </Stack>
        </form>
      </Modal>
    </List>
  );
};
