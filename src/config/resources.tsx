import { type IResourceItem } from "@refinedev/core";
import {
  Icon360View,
  IconArrowBarToDown,
  IconBrandAppgallery,
  IconBuilding,
  IconBuildingBank,
  IconDashboard,
  IconFaceId,
  IconHome,
  IconLockOpen,
  IconNotebook,
  IconPaperBag,
  IconSmartHome,
  IconTestPipe,
  IconUser,
} from "@tabler/icons";
import getLoginUser from "../utils/login-user";

const user = getLoginUser();

export const resources: IResourceItem[] = [
  {
    name: "home",
    list: "/home",
    meta: {
      label:
        user?.role === "ADMIN"
          ? "Dashboard"
          : user?.role === "JOB_SEEKER"
          ? "My Resume"
          : "Home",
      icon:
        user?.role === "ADMIN" ? (
          <IconDashboard size={20} />
        ) : user?.role === "JOB_SEEKER" ? (
          <IconNotebook size={20} />
        ) : (
          <IconHome size={20} />
        ),
    },
  },
  {
    name: "users",
    list: "/users",
    edit: "/users/edit/:id",
    show: "/users/show/:id",
    create: "/users/create",
    meta: {
      label: "User",
      icon: <IconUser size={20} />,
      hide:
        user == null || user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },
  {
    name: "company",
    meta: {
      label: "Company",
      icon: <IconBuildingBank size={20} />,
      hide:
        user == null || user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
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
      hide:
        user == null || user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
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
      hide:
        user == null || user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },

  {
    name: "resumes",
    list: "/resumes",
    show: "/resumes/show/:id",
    meta: {
      label: "Resume",
      icon: <IconFaceId size={20} />,
      hide:
        user == null || user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },
  {
    name: "applications",
    list: "/applications",
    show: "/applications/show/:id",
    meta: {
      label: "Job Application",
      icon: <IconArrowBarToDown size={20} />,
      hide:
        user == null || user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },

  {
    name: "assessment",
    meta: {
      label: "Assessment",
      icon: <IconTestPipe size={20} />,
      hide:
        user == null || user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
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
      hide:
        user == null || user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
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
      hide:
        user == null || user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },
  {
    name: "matches",
    list: "/matches",
    meta: {
      label: "Matching Index",
      icon: <IconSmartHome size={20} />,
      hide:
        user == null || user?.role === "COMPANY" || user?.role === "JOB_SEEKER",
    },
  },

  //Job Seeker Menus
  // {
  //   name: "my_resume",
  //   list: "/my_resume",
  //   meta: {
  //     label: "My Resume",
  //     icon: <IconMagnet />,
  //     hide: user == null || user?.role === "COMPANY" || user?.role === "ADMIN",
  //   },
  // },

  {
    name: "explore_jobs",
    list: "/explore_jobs",
    show: "/explore_jobs/show/:id",
    meta: {
      label: "Explore Jobs",
      icon: <IconLockOpen size={20} />,
      hide: user == null || user?.role === "COMPANY" || user?.role === "ADMIN",
    },
  },

  {
    name: "my_applications",
    list: "/my_applications",
    // show: "/my_applications/show/:id",
    meta: {
      label: "My Applications",
      icon: <IconBrandAppgallery size={20} />,
      hide: user == null || user?.role === "COMPANY" || user?.role === "ADMIN",
    },
  },
];
