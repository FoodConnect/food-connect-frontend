import {
  Card,
  Avatar,
  Text,
  Group,
  Button,
  Flex,
  Title,
  Center,
  Image,
  Drawer,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/router';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { UserData } from '@/components/Interfaces/UserData';
import classes from '@/components/Profile.module.css';

const stats = [
  { value: '34K', label: 'Donations' },
  { value: '187', label: 'Claimed Donations' },
  { value: '1.6K', label: 'Interactions' },
];

export default function Profile() {
  const [user, setUser] = useState<UserData>();
  const { data: session } = useSession();
  const router = useRouter();

  // Update Donation Drawer Variables
  const [opened, { open, close }] = useDisclosure(false);
  const { width } = useViewportSize();
  const setPosition = () => {
    if (width > 720) {
      return 'bottom';
    }
    return 'right';
  };

  // Delete Modal and Request for User Account
  function cancelDeleteDonation() {
    showNotification({
      title: 'Cancelled',
      color: 'teal',
      message: 'Delete Donation was cancelled.',
    });
  }
  async function handleDeleteDonation() {
    const response = await fetch(`http://localhost:8080/users/${session?.user.pk!}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      showNotification({
        title: 'Error Deleting',
        color: 'red',
        message: 'Sorry, there was an error deleting your account.',
      });
      return response.json();
    }
    showNotification({
      title: 'Deleted',
      color: 'green',
      message: 'Your account has been successfully deleted.',
    });
    await signOut({ callbackUrl: '/signin', redirect: true });
    return null;
  }
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete Account',
      centered: true,
      overlayProps: { backgroundOpacity: 0.3, blur: 2 },
      children: (
        <Text size="sm">
          Are you sure you want to delete your account? This action is destructive and you will not
          be able to retreive it again.
        </Text>
      ),
      labels: { confirm: 'Delete Account', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => cancelDeleteDonation(),
      onConfirm: () => handleDeleteDonation(),
    });

  // API Request and useEffect Functions to populate donation profile
  async function getData() {
    const response = await fetch(`http://localhost:8080/users/${session?.user.pk!}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      console.log('DATA: ', data);

      setUser(data);
      console.log('USER: ', user);
    };
    // eslint-disable-next-line no-console
    fetchData().catch(console.error);
  }, []);

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section>
        <Image src="/gradient.png" height={140} alt="blue-green gradient" />
      </Card.Section>
      <Avatar
        src={user?.image_data}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
        autoContrast
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {user?.business_name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {user?.username}
      </Text>
      <Group mt="md" justify="center" gap={30}>
        {items}
      </Group>
      <Center>
        <Flex my="lg" direction="column" gap={0}>
          {user?.role === 'donor' ? (
            <>
              <Title order={5}>Business Name</Title>
              <Text c="dimmed">{user?.business_name}</Text>
            </>
          ) : (
            <>
              <Title order={5}>Username</Title>
              <Text c="dimmed">{user?.username}</Text>
            </>
          )}
          <Title order={5}>Location</Title>
          <Text c="dimmed">{user?.address}</Text>
          <Text c="dimmed">
            {user?.city}, {user?.state}
          </Text>
          <Text c="dimmed">{user?.zipcode}</Text>
          <Title order={5}>Contact Info</Title>
          <Text c="dimmed">{user?.email}</Text>
          <Text c="dimmed">{user?.phone_number}</Text>
          <Title order={5}>EIN Number</Title>
          <Text c="dimmed">{user?.ein_number}</Text>
        </Flex>
      </Center>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        variant="default"
        onClick={open}
        rightSection={<IconEdit />}
      >
        Update Account
      </Button>
      <Drawer
        offset={8}
        radius="md"
        position={setPosition()}
        size="lg"
        opened={opened}
        onClose={close}
        title="Update Donation"
        overlayProps={{ backgroundOpacity: 0.3, blur: 2 }}
      >
        <Button
          onClick={openDeleteModal}
          variant="default"
          color="red"
          rightSection={<IconTrash />}
        >
          Delete Account
        </Button>
      </Drawer>
    </Card>
  );
}
