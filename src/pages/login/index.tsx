import { AuthPage, ThemedTitleV2 } from "@refinedev/mantine";
import { AppIcon } from "../../components/app-icon";
import { GiMagnet } from "react-icons/gi";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="Magnet"
          icon={<GiMagnet size={30} />}
        />
      }
      formProps={{
        initialValues: { email: "", password: "" },
      }}
    />
  );
};
