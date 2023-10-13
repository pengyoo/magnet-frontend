import React, { useState } from "react";
import {
  HttpError,
  IResourceComponentsProps,
  useList,
  useTable,
} from "@refinedev/core";
import { Group, Pagination } from "@mantine/core";
import { List } from "@refinedev/mantine";
import { Job } from "../../../interfaces";
import JobCard from "./card";

export const Jobseeker_JobList: React.FC<IResourceComponentsProps> = () => {
  const {
    filters,
    setFilters,
    tableQueryResult,
    pageCount,
    current,
    setCurrent,
  } = useTable<Job, HttpError>({
    resource: "explore_jobs",
  });

  return (
    <List breadcrumb={false}>
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
