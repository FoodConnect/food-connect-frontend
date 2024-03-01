import { AppShell, Group, Burger, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

// TODO: Define Interface for 'children'
// Reminder!!! Remove 'cdn.iconscout.com' from next.config.js
export function ApplicationContainer({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      footer={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header bg={{ base: 'blue.7', sm: 'red.7', lg: 'blue.9' }}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
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
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Text size="md" ta="center" fw={700}>
          Navbar
        </Text>
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
