import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mantine";

import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import {
  MantineCreateInferencer,
  MantineEditInferencer,
  MantineListInferencer,
  MantineShowInferencer,
} from "@refinedev/inferencer/mantine";
import {
  Icon360View,
  IconActivity,
  IconAngle,
  IconArrowBarToDown,
  IconBuilding,
  IconBuildingBank,
  IconFaceId,
  IconPaperBag,
  IconPointer,
  IconRegistered,
  IconTestPipe,
} from "@tabler/icons";
import { CompanyEdit, CompanyList, CompanyShow } from "./pages/companies";
import { JobEdit, JobList, JobShow } from "./pages/jobs";
import { ResumeEdit, ResumeList, ResumeShow } from "./pages/resumes";
import {
  JobApplicationList,
  JobApplicationShow,
} from "./pages/job-applications";
import { TestPaperList } from "./pages/test-paper/list";
import { TestPaperShow } from "./pages/test-paper/show";
import { AnswerSheetList, AnswerSheetShow } from "./pages/answers";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const { t, i18n } = useTranslation();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          {/* You can change the theme colors here. example: theme={{ ...RefineThemes.Magenta, colorScheme:colorScheme }} */}
          <MantineProvider
            theme={{ ...RefineThemes.Blue, colorScheme: colorScheme }}
            withNormalizeCSS
            withGlobalStyles
          >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
              <DevtoolsProvider>
                <Refine
                  dataProvider={dataProvider("http://localhost:8080/api/v1")}
                  notificationProvider={notificationProvider}
                  authProvider={authProvider}
                  i18nProvider={i18nProvider}
                  routerProvider={routerBindings}
                  resources={[
                    {
                      name: "company",
                      meta: {
                        label: "Company",
                        icon: <IconBuildingBank size={20} />,
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
                      },
                    },
                    {
                      name: "applications",
                      list: "/applications",
                      show: "/applications/show/:id",
                      meta: {
                        label: "Job Applications",
                        icon: <IconArrowBarToDown size={20} />,
                      },
                    },

                    {
                      name: "assessment",
                      meta: {
                        label: "Assessment",
                        icon: <IconTestPipe size={20} />,
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
                      },
                    },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    projectId: "me8FDa-VPDssa-wNEPqa",
                  }}
                >
                  <Routes>
                    <Route
                      element={
                        <Authenticated
                          key="authenticated-inner"
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          <ThemedLayoutV2
                            Header={() => <Header sticky />}
                            Title={({ collapsed }) => (
                              <ThemedTitleV2
                                collapsed={collapsed}
                                text="Magnet"
                                icon={<AppIcon />}
                              />
                            )}
                          >
                            <Outlet />
                          </ThemedLayoutV2>
                        </Authenticated>
                      }
                    >
                      <Route
                        element={<NavigateToResource resource="companies" />}
                      />
                      <Route path="/companies">
                        <Route index element={<CompanyList />} />
                        <Route path="edit/:id" element={<CompanyEdit />} />
                        <Route path="show/:id" element={<CompanyShow />} />
                      </Route>

                      <Route path="/jobs">
                        <Route index element={<JobList />} />
                        <Route path="edit/:id" element={<JobEdit />} />
                        <Route path="show/:id" element={<JobShow />} />
                      </Route>

                      <Route path="/resumes">
                        <Route index element={<ResumeList />} />
                        <Route path="edit/:id" element={<ResumeEdit />} />
                        <Route path="show/:id" element={<ResumeShow />} />
                      </Route>
                      <Route path="/applications">
                        <Route index element={<JobApplicationList />} />
                        <Route
                          path="show/:id"
                          element={<JobApplicationShow />}
                        />
                      </Route>

                      <Route path="/papers">
                        <Route index element={<TestPaperList />} />
                        <Route path="show/:id" element={<TestPaperShow />} />
                      </Route>

                      <Route path="/answers">
                        <Route index element={<AnswerSheetList />} />
                        <Route path="show/:id" element={<AnswerSheetShow />} />
                      </Route>

                      <Route path="/test">
                        <Route index element={<MantineListInferencer />} />
                      </Route>

                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                    <Route
                      element={
                        <Authenticated
                          key="authenticated-outer"
                          fallback={<Outlet />}
                        >
                          <NavigateToResource />
                        </Authenticated>
                      }
                    >
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                    </Route>
                  </Routes>

                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                </Refine>
                <DevtoolsPanel />
              </DevtoolsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
