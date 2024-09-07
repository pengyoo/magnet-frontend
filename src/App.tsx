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
  Center,
  ColorScheme,
  ColorSchemeProvider,
  Global,
  Loader,
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

import { CompanyEdit, CompanyList, CompanyShow } from "./pages/admin/companies";
import { JobEdit, JobList, JobShow } from "./pages/admin/jobs";
import { ResumeList, ResumeShow } from "./pages/admin/resumes";
import { JobApplicationShow } from "./pages/admin/job-applications";
import { TestPaperList } from "./pages/admin/test-paper/list";
import { TestPaperShow } from "./pages/admin/test-paper/show";
import { AnswerSheetList, AnswerSheetShow } from "./pages/admin/answers";

import axiosInstance, { API_URL } from "./services/axios-instance";
import { MatchingIndexList } from "./pages/admin/matches";
import { resources } from "./config/resources";
import { DashboardContent } from "./pages/admin/dashboard/DashboardContent";
import ResumeForm from "./pages/jobseeker/resume/form";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/admin/users";
import { MyApplicationList } from "./pages/jobseeker/applications";
import { Jobseeker_JobList } from "./pages/jobseeker/jobs/list";
import { Jobseeker_JobShow } from "./pages/jobseeker/jobs/show";

import getLoginUser from "./utils/login-user";
import CompanyForm from "./pages/company/company/form";

import "./App.css";
import { CJobList } from "./pages/company/jobs/list";
import { TestList } from "./pages/company/tests/list";
import { TestShow } from "./pages/company/tests/show";
import { TestEdit } from "./pages/company/tests/edit";
import { JobApplicationListComponent } from "./components/JobApplicationListComponent";
import { TestInvitationList } from "./pages/company/invitations/list";
import { MyTestInvitationList } from "./pages/jobseeker/invitations/list";
import { MyTestInvitationShow } from "./pages/jobseeker/invitations/show";
import { ErrorPage } from "./pages/ErrorPage";
import LandingPage from "./pages/landing/LandPage";
import { TestResultList } from "./pages/company/answers/list";
import { TestResultShow } from "./pages/company/answers/show";

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
                          loading={
                            <Center>
                              <Loader size="xs" />
                            </Center>
                          }
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
                            <Route
                              index
                              element={<JobApplicationListComponent />}
                            />
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
                      {user?.role == "JOB_SEEKER" && (
                        <>
                          <Route
                            path="/my_resume"
                            index
                            element={<ResumeForm />}
                          />

                          <Route path="/sjobs">
                            <Route index element={<Jobseeker_JobList />} />
                            <Route
                              path="show/:id"
                              element={<Jobseeker_JobShow />}
                            />
                          </Route>

                          <Route path="/sapplications">
                            <Route index element={<MyApplicationList />} />
                            {/* <Route
                            path="show/:id"
                            element={<MyApplicationShow />}
                          /> */}
                          </Route>
                          <Route path="/sinvitations">
                            <Route index element={<MyTestInvitationList />} />

                            <Route
                              path="show/:id"
                              element={<MyTestInvitationShow />}
                            />
                          </Route>
                        </>
                      )}

                      {/* Company Route */}
                      {user?.role === "COMPANY" && (
                        <>
                          <Route
                            path="/ccompany"
                            index
                            element={<CompanyForm />}
                          />
                          <Route path="/cjobs">
                            <Route index element={<CJobList />} />
                            <Route path="edit/:id" element={<JobEdit />} />
                            <Route path="create" element={<JobEdit />} />
                          </Route>
                          <Route path="/capplications">
                            <Route
                              index
                              element={<JobApplicationListComponent />}
                            />
                          </Route>

                          <Route path="/ctests">
                            <Route index element={<TestList />} />
                            <Route path="show/:id" element={<TestShow />} />
                            <Route path="edit/:id" element={<TestEdit />} />
                            <Route path="create" element={<TestEdit />} />
                          </Route>
                          <Route path="/cinvitations">
                            <Route index element={<TestInvitationList />} />
                          </Route>
                          <Route path="/canswers">
                            <Route index element={<TestResultList />} />
                            <Route
                              path="show/:id"
                              element={<TestResultShow />}
                            />
                          </Route>
                        </>
                      )}
                    </Route>

                    {/* Pages don't need to login */}
                    <Route
                      element={
                        <Authenticated
                          key="authenticated-outer"
                          fallback={<Outlet />}
                          loading={
                            <Center>
                              <Loader size="xs" />
                            </Center>
                          }
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
                      <Route path="/" index element={<LandingPage />} />
                      <Route path="*" element={<ErrorPage />} />
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
