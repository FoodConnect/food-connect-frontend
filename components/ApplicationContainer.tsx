import { AppShell, Group, Text, ActionIcon, Stack, NavLink, Anchor, rem, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBell,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconCarrot,
  IconChevronRight,
  IconLayoutDashboard,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconMap2,
  IconUserCircle,
  IconX,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import classes from './FooterCentered.module.css';

// Reminder!!! Remove 'cdn.iconscout.com' from next.config.js

export function ApplicationContainer({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  // Footer Link Features and Map Function
  const links = [
    { link: '#', label: 'Contact' },
    { link: '#', label: 'Privacy' },
    { link: '#', label: 'Blog' },
    { link: '#', label: 'Store' },
    { link: '#', label: 'Careers' },
  ];

  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));
  // End Footer item features and function

  // Navbar Link Features and Map Function
  const navLinks: any[] = [
    {
      icon: <IconLayoutDashboard size="1.3rem" stroke={1.5} />,
      href: '/',
      label: 'Home',
    },
    {
      icon: <IconUserCircle size="1.3rem" stroke={1.5} />,
      href: '/signup',
      label: 'Profile',
    },
    {
      icon: <IconCarrot size="1.3rem" stroke={1.5} />,
      href: '/donor-donations',
      label: 'Donations',
    },
    {
      icon: <IconMap2 size="1.3rem" stroke={1.5} />,
      href: '/',
      label: 'Map View',
    },
    {
      icon: <IconBell size="1.3rem" stroke={1.5} />,
      href: '/',
      label: 'Notifications',
    },
    {
      icon: <IconBell size="1.3rem" stroke={1.5} />,
      href: '/',
      label: 'Notifications',
    },
  ];

  const navItems = navLinks.map((navLink) => (
    <NavLink
      component={Link}
      href={navLink.href}
      label={navLink.label}
      color="green"
      leftSection={navLink.icon}
      rightSection={<IconChevronRight size="1rem" stroke={1.5} className="mantine-rotate-rtl" />}
      variant="filled"
      active
      onClick={toggle}
    />
  ));
  // End Navbar item features and function

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
          {navItems}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>
        <div className={classes.inner}>
          <Box />
          <Group justify="center" pl="xl" className={classes.links}>
            {items}
          </Group>

          <Group gap="xs" justify="flex-end" wrap="nowrap">
            <ActionIcon
              size="lg"
              variant="gradient"
              gradient={{ from: 'chartreuse', to: 'green', deg: 90 }}
              radius="xl"
              component={Link}
              href="https://github.com/FoodConnect"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              size="lg"
              variant="gradient"
              gradient={{ from: 'green', to: 'teal', deg: 90 }}
              radius="xl"
              component={Link}
              href="https://www.linkedin.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconBrandLinkedin style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              size="lg"
              variant="gradient"
              gradient={{ from: 'teal', to: 'navy', deg: 90 }}
              radius="xl"
              component={Link}
              href="https://www.instagram.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </div>
      </AppShell.Footer>
    </AppShell>
  );
}
