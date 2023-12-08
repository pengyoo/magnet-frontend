import {
  ActionIcon,
  Avatar,
  Drawer,
  Flex,
  Group,
  Header as MantineHeader,
  Menu,
  Sx,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import {
  HamburgerMenu,
  RefineThemedLayoutV2HeaderProps,
} from "@refinedev/mantine";
import {
  IconLanguage,
  IconMoonStars,
  IconSettings,
  IconSun,
} from "@tabler/icons";
import i18n from "i18next";
import React, { useState } from "react";
import SettingComponent from "./SettingComponent";
import { API_URL } from "../../services/axios-instance";
import { User } from "../../interfaces";

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky,
}) => {
  const { data: user } = useGetIdentity<User>();

  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  const theme = useMantineTheme();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const borderColor = dark ? theme.colors.dark[6] : theme.colors.gray[2];

  let stickyStyles: Sx = {};
  if (sticky) {
    stickyStyles = {
      position: `sticky`,
      top: 0,
      zIndex: 1,
    };
  }

  const [opened, setOpened] = useState(false);

  const [headShotName, setHeadShotName] = useState(user?.headShotName);

  return (
    <MantineHeader
      zIndex={199}
      height={64}
      py={6}
      px="sm"
      sx={{
        borderBottom: `1px solid ${borderColor}`,
        ...stickyStyles,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        sx={{
          height: "100%",
        }}
      >
        <HamburgerMenu />
        <Group>
          {/* <Menu shadow="md">
            <Menu.Target>
              <ActionIcon variant="outline">
                <IconLanguage size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {[...(i18n.languages ?? [])].sort().map((lang: string) => (
                <Menu.Item
                  key={lang}
                  onClick={() => {
                    changeLanguage(lang);
                  }}
                  value={lang}
                  color={lang === currentLocale ? "primary" : undefined}
                  icon={
                    <Avatar
                      src={`/images/flags/${lang}.svg`}
                      size={18}
                      radius="lg"
                    />
                  }
                >
                  {lang === "en" ? "English" : "German"}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu> */}

          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "primary"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>

          {(user?.email || user?.headShotName) && (
            <Group spacing="xs">
              {/* {user?.name && <Title order={6}>{user?.name}</Title>} */}
              <Menu shadow="md">
                <Menu.Target>
                  <ActionIcon variant="outline" onClick={() => setOpened(true)}>
                    <Avatar
                      src={`${API_URL}/images/${user?.email}/${headShotName}`}
                      alt={user?.email}
                      radius="xl"
                    />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={<IconSettings size={16} />}>
                    Account Setting
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          )}
        </Group>
      </Flex>
      <SettingComponent
        headShot={headShotName}
        setHeadShot={setHeadShotName}
        opened={opened}
        setOpened={setOpened}
      />
    </MantineHeader>
  );
};
