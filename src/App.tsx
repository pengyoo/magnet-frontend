import { Authenticated, Refine } from "@refinedev/core";
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
import //   MantineCreateInferencer,
//   MantineEditInferencer,
// MantineListInferencer,
// MantineShowInferencer,
"@refinedev/inferencer/mantine";

import { CompanyEdit, CompanyList, CompanyShow } from "./pages/admin/companies";
import { JobEdit, JobList, JobShow } from "./pages/admin/jobs";
import { ResumeList, ResumeShow } from "./pages/admin/resumes";
import {
  JobApplicationList,
  JobApplicationShow,
} from "./pages/admin/job-applications";
import { TestPaperList } from "./pages/admin/test-paper/list";
import { TestPaperShow } from "./pages/admin/test-paper/show";
import { AnswerSheetList, AnswerSheetShow } from "./pages/admin/answers";

import axiosInstance, { API_URL } from "./services/axios-instance";
import { MatchingIndexList } from "./pages/admin/matches";
import { resources } from "./config/resources";
import { DashboardContent } from "./pages/dashboard/DashboardContent";
import ResumeForm from "./pages/jobseeker/ResumeForm";
import getLoginUser from "./utils/login-user";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/admin/users";
import {
  MyApplicationList,
  MyApplicationShow,
} from "./pages/jobseeker/applications";
import { Jobseeker_JobList } from "./pages/jobseeker/jobs/list";
import { Jobseeker_JobShow } from "./pages/jobseeker/jobs/show";

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

  const simpleRestProvider = dataProvider(API_URL, axiosInstance);
  const user = getLoginUser();

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
                  dataProvider={simpleRestProvider}
                  notificationProvider={notificationProvider}
                  authProvider={authProvider}
                  i18nProvider={i18nProvider}
                  routerProvider={routerBindings}
                  resources={resources}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    projectId: "me8FDa-VPDssa-wNEPqa",
                  }}
                >
                  <Routes>
                    {/* Pages need to login first */}
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
                      {/* <Route
                        element={<NavigateToResource resource="dashboard" />}
                      /> */}
                      {/* Check User Role */}

                      <Route
                        path="/home"
                        index
                        element={<DashboardContent />}
                      />

                      {/* ADMIN MENU */}
                      {user?.role == "ADMIN" && (
                        <>
                          <Route path="/users">
                            <Route index element={<UserList />} />
                            <Route path="edit/:id" element={<UserEdit />} />
                            <Route path="show/:id" element={<UserShow />} />
                            <Route path="create" element={<UserCreate />} />
                          </Route>

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

                          <Route
                            element={<NavigateToResource resource="resumes" />}
                          />
                          <Route path="/resumes">
                            <Route index element={<ResumeList />} />
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
                            <Route
                              path="show/:id"
                              element={<TestPaperShow />}
                            />
                          </Route>

                          <Route path="/answers">
                            <Route index element={<AnswerSheetList />} />
                            <Route
                              path="show/:id"
                              element={<AnswerSheetShow />}
                            />
                          </Route>
                          <Route path="/matches">
                            <Route index element={<MatchingIndexList />} />
                          </Route>
                          <Route path="*" element={<ErrorComponent />} />
                        </>
                      )}
                      {/* JOB_SEEKER MENU */}
                      {/* {user?.role == "JOB_SEEKER" && (
                        <>
                          <Route
                            path="/my_resume"
                            index
                            element={<ResumeForm />}
                          />
                        </>
                      )} */}

                      {user?.role == "JOB_SEEKER" && (
                        <Route path="/explore_jobs">
                          <Route index element={<Jobseeker_JobList />} />
                          <Route
                            path="show/:id"
                            element={<Jobseeker_JobShow />}
                          />
                        </Route>
                      )}

                      {user?.role == "JOB_SEEKER" && (
                        <Route path="/my_applications">
                          <Route index element={<MyApplicationList />} />
                          {/* <Route
                            path="show/:id"
                            element={<MyApplicationShow />}
                          /> */}
                        </Route>
                      )}
                    </Route>

                    {/* Pages don't need to login */}
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

                    {/* External pages independent of the Refine management system */}
                    <Route>
                      <Route path="/" index element={<ResumeForm />} />
                      <Route path="/landing" element={<ResumeForm />} />
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
