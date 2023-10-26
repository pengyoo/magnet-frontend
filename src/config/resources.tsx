import { type IResourceItem } from "@refinedev/core";
import { IconDashboard } from "@tabler/icons";
import getLoginUser from "../utils/login-user";
import { PiExamLight } from "react-icons/pi";
import {
  BsBuildings,
  BsCalendarHeart,
  BsClipboardData,
  BsPersonCheck,
  BsReverseLayoutTextWindowReverse,
} from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { GrDocumentUser } from "react-icons/gr";
import { GiMagnet } from "react-icons/gi";

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
          : "Company",
      icon:
        user?.role === "ADMIN" ? (
          <IconDashboard size={22} />
        ) : user?.role === "JOB_SEEKER" ? (
          <ImProfile size={18} />
        ) : (
          <AiOutlineHome size={20} />
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
      icon: <GrDocumentUser size={18} />,
      hide: user?.role != "ADMIN",
    },
  },
  {
    name: "company",
    meta: {
      label: "Company",
      icon: <BsBuildings size={18} />,
      hide: user?.role != "ADMIN",
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
      icon: <BsBuildings size={20} />,
      hide: user?.role != "ADMIN",
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
      icon: <BsClipboardData size={20} />,
      hide: user?.role != "ADMIN",
    },
  },

  {
    name: "resumes",
    list: "/resumes",
    show: "/resumes/show/:id",
    meta: {
      label: "Resume",
      icon: <ImProfile size={18} />,
      hide: user?.role != "ADMIN",
    },
  },
  {
    name: "applications",
    list: "/applications",
    show: "/applications/show/:id",
    meta: {
      label: "Job Application",
      icon: <BsPersonCheck size={20} />,
      hide: user?.role != "ADMIN",
    },
  },

  {
    name: "assessment",
    meta: {
      label: "Assessment",
      icon: <PiExamLight size={22} />,
      hide: user?.role != "ADMIN",
    },
  },
  {
    name: "papers",
    list: "/papers",
    show: "/papers/show/:id",
    meta: {
      label: "Test Paper",
      icon: <PiExamLight size={22} />,
      parent: "assessment",
      hide: user?.role != "ADMIN",
    },
  },
  {
    name: "answers",
    list: "/answers",
    show: "/answers/show/:id",
    meta: {
      label: "Answer Sheet",
      icon: <BsReverseLayoutTextWindowReverse size={16} />,
      parent: "assessment",
      hide: user?.role != "ADMIN",
    },
  },
  {
    name: "matches",
    list: "/matches",
    meta: {
      label: "Matching Index",
      icon: <GiMagnet size={20} />,
      hide: user?.role != "ADMIN",
    },
  },

  //Job Seeker Menus
  // {
  //   name: "my_resume",
  //   list: "/my_resume",
  //   meta: {
  //     label: "My Resume",
  //     // icon: <IconMagnet />,
  //     hide: user?.role != "COMPANY",
  //   },
  // },

  {
    name: "sjobs",
    list: "/sjobs",
    show: "/sjobs/show/:id",
    meta: {
      label: "Explore Jobs",
      icon: <BsClipboardData size={18} />,
      hide: user?.role != "JOB_SEEKER",
    },
  },

  {
    name: "sapplications",
    list: "/sapplications",
    // show: "/my_applications/show/:id",
    meta: {
      label: "My Applications",
      icon: <BsPersonCheck size={20} />,
      hide: user?.role != "JOB_SEEKER",
    },
  },

  {
    name: "sinvitations",
    list: "/sinvitations",
    show: "/sinvitations/show/:id",
    meta: {
      label: "Test Invitation",
      icon: <BsCalendarHeart size={17} />,
      hide: user?.role != "JOB_SEEKER",
    },
  },

  //Company Menus

  // {
  //   name: "ccompany",
  //   list: "/ccompany",
  //   meta: {
  //     label: "Company Information",
  //     icon: <IconLockOpen />,
  //     hide: user?.role != "COMPANY",
  //   },
  // },
  {
    name: "cjobs",
    list: "/cjobs",
    edit: "/cjobs/edit/:id",
    create: "/cjobs/create",
    canDelete: true,
    meta: {
      label: "Job",
      icon: <BsClipboardData size={18} />,
      hide: user?.role != "COMPANY",
      canDelete: true,
    },
  },

  {
    name: "capplications",
    list: "/capplications",
    meta: {
      label: "Application",
      icon: <BsPersonCheck size={20} />,
      hide: user?.role != "COMPANY",
      canDelete: true,
    },
  },

  {
    name: "assesment",
    meta: {
      label: "Assesment",
      icon: <PiExamLight size={22} />,
      hide: user?.role != "COMPANY",
    },
  },

  {
    name: "ctests",
    list: "/ctests",
    show: "/ctests/show/:id",
    edit: "/ctests/edit/:id",
    create: "/ctests/create",
    meta: {
      label: "Test",
      icon: <PiExamLight size={22} />,
      hide: user?.role != "COMPANY",
      canDelete: true,
      parent: "assesment",
    },
  },
  {
    name: "cinvitations",
    list: "/cinvitations",
    meta: {
      label: "Invitation",
      icon: <BsCalendarHeart size={17} />,
      hide: user?.role != "COMPANY",
      canDelete: true,
      parent: "assesment",
    },
  },
  {
    name: "canswers",
    list: "/canswers",
    show: "/canswers/show/:id",
    meta: {
      label: "Test Result",
      icon: <BsReverseLayoutTextWindowReverse size={16} />,
      hide: user?.role != "COMPANY",
      parent: "assesment",
    },
  },
];
