import { AuthPage, ThemedTitleV2 } from "@refinedev/mantine";
import { AppIcon } from "../../components/app-icon";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2 collapsed={false} text="Magnet" icon={<AppIcon />} />
      }
      formProps={{
        initialValues: { email: "demo@refine.dev", password: "demodemo" },
      }}
    />
  );
};
