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
  IconSearch,
  IconShoppingCart,
  IconUserCircle,
  IconX,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import classes from './FooterCentered.module.css';

// REMINDER!!! Remove 'cdn.iconscout.com' from next.config.js

export function ApplicationContainer({
  children,
  dummyUser,
}: {
  children: React.ReactNode;
  dummyUser: { id: number; role: string };
}) {
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
  const checkUserType = () => {
    if (dummyUser.role === 'donor') {
      return '/Donations/donor-donations';
    }
    if (dummyUser.role === 'charity') {
      return '/Donations/charity-donations';
    }
    return '/';
  };
  const navLinks: any[] = [
    {
      icon: <IconLayoutDashboard size="1.3rem" stroke={1.5} />,
      href: '/',
      label: 'Home',
    },
    {
      icon: <IconSearch size="1.3rem" stroke={1.5} />,
      href: '/',
      label: 'Search',
    },
    {
      icon: <IconCarrot size="1.3rem" stroke={1.5} />,
      href: checkUserType(),
      label: 'Donations',
    },
    {
      icon: <IconUserCircle size="1.3rem" stroke={1.5} />,
      href: '/signup',
      label: 'Profile',
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
      icon: <IconShoppingCart size="1.3rem" stroke={1.5} />,
      href: '/',
      label: 'Cart',
    },
  ];
  const navItems = navLinks.map((navLink) => (
    <NavLink
      key={navLink.label}
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
          <Image src="/favicon.svg" alt="Food Connect Favicon" width={60} height={60} />
          <Text size="md" ta="center" fw={700}>
            Food Connect
          </Text>
        </Group>
        <Group pos="absolute" mt={50} pl={10} style={{ zIndex: 700 }}>
          <ActionIcon
            radius="xl"
            size="xl"
            onClick={toggle}
            color="green"
            variant="light"
            aria-label="Open or close navbar drawer"
          >
            {opened ? (
              <IconLayoutSidebarLeftCollapse color="green" stroke={0.9} size={37} />
            ) : (
              <IconLayoutSidebarLeftExpand color="green" stroke={0.9} size={37} />
            )}
          </ActionIcon>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" bg="green" style={{ zIndex: 1000 }}>
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
