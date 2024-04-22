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
  Grid,
  TextInput,
  InputLabel,
  PinInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
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

  // Update Donation Drawer Variables
  const [opened, { open, close }] = useDisclosure(false);
  const { width } = useViewportSize();
  const setPosition = () => {
    if (width > 720) {
      return 'bottom';
    }
    return 'right';
  };

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      name: '',
      password: '',
      terms: true,
      business_name: '',
      role: '',
      ein_number: '',
      image_data: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phone_number: '',
    },

    validate: {
      // email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      username: (val) =>
        val.length >= 150
          ? 'Username invalid. Must not exceed 150 characters and be unique.'
          : null,
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      business_name: (val) =>
        val.length > 255 ? 'Business name should not be more than 255 characters' : null,
      image_data: (val) =>
        val.length > 255 ? 'Image URL should not be more than 255 characters' : null,
      address: (val) =>
        val.length > 255 ? 'Address should not be more than 255 characters' : null,
      city: (val) => (val.length > 255 ? 'City should not be more than 255 characters' : null),
      state: (val) => (val.length > 255 ? 'State should not be more than 255 characters' : null),
      zipcode: (val) => (val.length > 255 ? 'Zipcode should not be more than 10 characters' : null),
      phone_number: (val) =>
        val.length > 255 ? 'Phone number should not be more than 20 characters' : null,
    },
  });

  // Update User Submission Method
  const handleUpdateUser = async (values: UserData) => {
    await fetch(`http://localhost:8080/users/${session?.user?.pk}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          showNotification({
            title: 'Error Updating',
            color: 'red',
            message: 'Sorry, there was an error submitting your update.',
          });
          return response.json();
        }
        showNotification({
          title: 'Update Successful',
          color: 'green',
          message: 'Your update has been successfully submitted.',
        });
        close();
        setUser(values);
        return response.json();
      })
      .catch((error) => {
        if (error !== null) {
          null;
        }
      });
  };

  // Delete Modal and Request for User Account
  function cancelDeleteUser() {
    showNotification({
      title: 'Cancelled',
      color: 'teal',
      message: 'Delete Donation was cancelled.',
    });
  }
  async function handleDeleteUser() {
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
      onCancel: () => cancelDeleteUser(),
      onConfirm: () => handleDeleteUser(),
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
      setUser(data);
      if (data) {
        form.initialize(data);
      }
    };
    // eslint-disable-next-line no-console
    fetchData().catch(console.error);
  }, [session]);

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
        <form onSubmit={form.onSubmit(handleUpdateUser)}>
          <Group>
            <Grid grow gutter="xl">
              <Grid.Col span={{ base: 12, xs: 6 }}>
                <TextInput
                  label="Email"
                  placeholder="hello@foodconnect.com"
                  value={form.values.email}
                  onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                  error={form.errors.email && 'Invalid email'}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6 }}>
                <TextInput
                  label="Image URL"
                  placeholder="https://your-image-url.com"
                  value={form.values.image_data}
                  onChange={(event) => form.setFieldValue('image_data', event.currentTarget.value)}
                  error={form.errors.image_data && 'Invalid image URL'}
                  radius="md"
                />
              </Grid.Col>
              {session?.user?.role === 'donor' ? (
                <>
                  <Grid.Col span={{ base: 12, xs: 6 }}>
                    <TextInput
                      label="Business Name"
                      placeholder="Perri Farms"
                      value={form.values.business_name}
                      onChange={(event) =>
                        form.setFieldValue('business_name', event.currentTarget.value)
                      }
                      error={form.errors.business_name && 'Invalid business name'}
                      radius="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 6 }}>
                    <InputLabel>EIN Number</InputLabel>
                    <PinInput
                      length={9}
                      size="xs"
                      inputMode="numeric"
                      type="number"
                      gap="xs"
                      placeholder="○"
                      value={form.values.ein_number}
                      onChange={(value: string) => {
                        if (/^[0-9]*$/.test(value)) {
                          form.setFieldValue('ein_number', value);
                        }
                      }}
                      radius="md"
                    />
                  </Grid.Col>
                </>
              ) : null}
              <Grid.Col span={{ base: 12, xs: 6 }}>
                <TextInput
                  label="Address"
                  placeholder="123 Street"
                  value={form.values.address}
                  onChange={(event) => form.setFieldValue('address', event.currentTarget.value)}
                  error={form.errors.address && 'Invalid address'}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6 }}>
                <TextInput
                  label="City"
                  placeholder="Grayslake"
                  value={form.values.city}
                  onChange={(event) => form.setFieldValue('city', event.currentTarget.value)}
                  error={form.errors.city && 'Invalid city'}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6 }}>
                <TextInput
                  label="State"
                  placeholder="Illinois"
                  value={form.values.state}
                  onChange={(event) => form.setFieldValue('state', event.currentTarget.value)}
                  error={form.errors.state && 'Invalid state'}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6 }}>
                <TextInput
                  label="Zipcode"
                  placeholder="12345"
                  value={form.values.zipcode}
                  onChange={(event) => form.setFieldValue('zipcode', event.currentTarget.value)}
                  error={form.errors.zipcode && 'Invalid zipcode'}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6 }}>
                <InputLabel>Phone Number</InputLabel>
                <PinInput
                  length={10}
                  size="xs"
                  inputMode="numeric"
                  type="number"
                  gap="xs"
                  placeholder="#"
                  value={form.values.phone_number}
                  onChange={(value: string) => {
                    if (/^[0-9]*$/.test(value)) {
                      form.setFieldValue('phone_number', value);
                    }
                  }}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6 }}>
                <Flex justify="center">
                  <Button type="submit" color="green" radius="xl">
                    Submit
                  </Button>
                </Flex>
              </Grid.Col>
            </Grid>
          </Group>
        </form>
      </Drawer>
      <Flex justify="center" align="center" direction="column" mt="xl">
        <Button
          onClick={openDeleteModal}
          variant="default"
          color="red"
          rightSection={<IconTrash />}
        >
          Delete Account
        </Button>
      </Flex>
    </Card>
  );
}
