import { AuthPage, ThemedTitleV2 } from "@refinedev/mantine";
import { AppIcon } from "../../components/app-icon";

export const ForgotPassword = () => {
  return (
    <AuthPage
      type="forgotPassword"
      title={
        <ThemedTitleV2 collapsed={false} text="Magnet" icon={<AppIcon />} />
      }
    />
  );
};
