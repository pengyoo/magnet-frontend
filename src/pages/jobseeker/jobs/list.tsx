import React, { useMemo, useState } from "react";
import {
  HttpError,
  IResourceComponentsProps,
  useList,
  useTable,
} from "@refinedev/core";
import {
  Autocomplete,
  Button,
  Group,
  Pagination,
  Space,
  TextInput,
} from "@mantine/core";
import { List } from "@refinedev/mantine";
import { Job } from "../../../interfaces";
import JobCard from "./card";
import { IconSearch } from "@tabler/icons";

export const Jobseeker_JobList: React.FC<IResourceComponentsProps> = () => {
  const { setFilters, tableQueryResult, pageCount, current, setCurrent } =
    useTable<Job, HttpError>({
      resource: "explore_jobs",
    });

  const [title, setTitle] = useState("");

  // Search by title
  const handleSearch = () => {
    setFilters([
      {
        field: "title",
        operator: "contains",
        value: title,
      },
    ]);
  };

  return (
    <List breadcrumb={false}>
      <Group position="left">
        <TextInput
          placeholder="Search"
          icon={<IconSearch />}
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <Button onClick={handleSearch}>Search Jobs</Button>
      </Group>
      <Space m="lg" />
      <Group position="left">
        {tableQueryResult.data?.data?.map((job: Job) => {
          return (
            <JobCard
              title={job.title}
              key={job.id}
              id={job.id}
              company={job.company.name}
              createdAt={job.createdAt}
              expireAt={job.expireAt}
              description={job.description?.slice(0, 150) + "..."}
            />
          );
        })}
      </Group>
      <Pagination
        total={pageCount}
        position="right"
        page={current}
        onChange={setCurrent}
      />
    </List>
  );
};
