import { AppShell, Group, Text, ActionIcon, Stack, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronRight,
  IconLayoutDashboard,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconUserCircle,
  IconX,
} from '@tabler/icons-react';
import Image from 'next/image';

// TODO: Define Interface for 'children'
// Reminder!!! Remove 'cdn.iconscout.com' from next.config.js
export function ApplicationContainer({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}
      footer={{ height: 60 }}
      padding="md"
      layout="alt"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
          <Image
            src="https://cdn.iconscout.com/icon/free/png-256/free-google-160-189824.png"
            alt="Google 'G' Logo"
            width={20}
            height={20}
          />
          <Text size="md" ta="center" fw={700}>
            Header
          </Text>
        </Group>
        {/* <ActionIcon pos="absolute" mt={100} size={40} onClick={toggle} bg="transparent"> */}
        <Group pos="absolute" mt={50} pl={10}>
          <ActionIcon radius="xl" p={20} onClick={toggle} color="green" variant="light">
            {opened ? (
              <IconLayoutSidebarLeftCollapse color="green" stroke={0.9} size={37} />
            ) : (
              <IconLayoutSidebarLeftExpand color="green" stroke={0.9} size={37} />
            )}
          </ActionIcon>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" bg="green">
        <ActionIcon autoContrast color="green" radius="xl" size={40} onClick={toggle}>
          <IconX color="white" />
        </ActionIcon>
        <Stack mt={30} gap="xs">
          <NavLink
            href="/"
            label="Home"
            color="green"
            leftSection={<IconLayoutDashboard size="1.3rem" stroke={1.5} />}
            rightSection={
              <IconChevronRight size="1rem" stroke={1.5} className="mantine-rotate-rtl" />
            }
            variant="filled"
            active
          />
          <NavLink
            href="/signup"
            label="Profile"
            color="green"
            leftSection={<IconUserCircle size="1.3rem" stroke={1.5} />}
            rightSection={
              <IconChevronRight size="1rem" stroke={1.5} className="mantine-rotate-rtl" />
            }
            variant="filled"
            active
          />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>
        <Text size="md" ta="center" fw={700} pt={15}>
          Footer
        </Text>
      </AppShell.Footer>
    </AppShell>
  );
}
