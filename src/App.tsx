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
import { MantineListInferencer } from "@refinedev/inferencer/mantine";

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

import axiosInstance, { API_URL } from "./services/axios-instance";
import { MatchingIndexList } from "./pages/matches";
import { resources } from "./config/resources";
import { DashboardContent } from "./pages/dashboard/DashboardContent";
import Resume from "./pages/jobseeker/Resume";
import getLoginUser from "./utils/login-user";

const user = getLoginUser();

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
                      <Route path="/">
                        {/* Check User Role */}
                        {user?.role == "ADMIN" && (
                          <Route index element={<DashboardContent />} />
                        )}
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
                      <Route path="/matches">
                        <Route index element={<MatchingIndexList />} />
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
                      <Route path="/jobseeker" element={<Resume />} />
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
