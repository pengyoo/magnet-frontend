import { type IResourceItem } from "@refinedev/core";
import {
  Icon360View,
  IconArrowBarToDown,
  IconBuilding,
  IconBuildingBank,
  IconDashboard,
  IconFaceId,
  IconPaperBag,
  IconSmartHome,
  IconTestPipe,
} from "@tabler/icons";
import getLoginUser from "../utils/login-user";

const user = getLoginUser();

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <IconDashboard />,
      hide: user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },
  {
    name: "company",
    meta: {
      label: "Company",
      icon: <IconBuildingBank size={20} />,
      hide: user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },
  {
    name: "companies",
    list: "/companies",
    edit: "/companies/edit/:id",
    show: "/companies/show/:id",
    meta: {
      label: "Company",
      parent: "company",
      icon: <IconBuilding size={20} />,
      hide: user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },
  {
    name: "jobs",
    list: "/jobs",
    edit: "/jobs/edit/:id",
    show: "/jobs/show/:id",
    meta: {
      label: "Job",
      parent: "company",
      icon: <Icon360View size={20} />,
      hide: user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },

  {
    name: "resumes",
    list: "/resumes",
    edit: "/resumes/edit/:id",
    show: "/resumes/show/:id",
    meta: {
      label: "Resume",
      icon: <IconFaceId size={20} />,
      hide: user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },
  {
    name: "applications",
    list: "/applications",
    show: "/applications/show/:id",
    meta: {
      label: "Job Application",
      icon: <IconArrowBarToDown size={20} />,
      hide: user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },

  {
    name: "assessment",
    meta: {
      label: "Assessment",
      icon: <IconTestPipe size={20} />,
      hide: user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },
  {
    name: "papers",
    list: "/papers",
    show: "/papers/show/:id",
    meta: {
      label: "Test Paper",
      icon: <IconPaperBag size={20} />,
      parent: "assessment",
      hide: user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },
  {
    name: "answers",
    list: "/answers",
    show: "/answers/show/:id",
    meta: {
      label: "Answer Sheet",
      icon: <IconPaperBag size={20} />,
      parent: "assessment",
      hide: user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },
  {
    name: "matches",
    list: "/matches",
    meta: {
      label: "Matching Index",
      icon: <IconSmartHome size={20} />,
      hide: user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },
];
