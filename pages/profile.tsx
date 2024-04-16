import { Card, Avatar, Text, Group, Button, Flex, Title, Center } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
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
      console.log(data);
      setUser(data);
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
      <Card.Section
        h={140}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
        }}
      />
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
          <Title order={5}>Business Name</Title>
          <Text c="dimmed">{user?.business_name ? user?.business_name : null}</Text>
          <Title order={5}>Location</Title>
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
      <Button fullWidth radius="md" mt="xl" size="md" variant="default">
        Contact
      </Button>
    </Card>
  );
}
