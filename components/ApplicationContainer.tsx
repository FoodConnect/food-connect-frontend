import { AppShell, Group, Burger, Skeleton, Text, Button } from '@mantine/core';
import { useDisclosure, useHover, useToggle } from '@mantine/hooks';
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
        {!opened ? (
          <Button color="shrek" onClick={toggle}>
            OPEN
          </Button>
        ) : (
          ' '
        )}
      </AppShell.Header>
      {/* TODO: SET COLOR based on color scheme */}
      <AppShell.Navbar p="md" bg="gray">
        <Button w="50" color="pink" onClick={toggle}>
          X
        </Button>
        <Text size="md" ta="center" fw={700}>
          Navbar
        </Text>
        {/* TODO: LOOK AT SKELETON FOR NAV */}
        <Skeleton h={28} mt="sm" animate />
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
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
