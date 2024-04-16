import { signOut, useSession } from 'next-auth/react';
import { Button, Loader, Group, Paper, Divider, Center, Flex } from '@mantine/core';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';

export default function SignOut() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // eslint-disable-next-line eqeqeq
  if (status == 'loading') {
    return (
      <Center>
        <Loader size="xl" color="navy" type="dots" />
      </Center>
    );
  }
  if (!session) {
    showNotification({
      title: 'Signed Out!',
      color: 'teal',
      message: 'You are now signed out.',
    });
    router.push('/signin');
  }

  // Redirect to Sign Up Page
  return (
    <Flex justify="center" align="center" direction="column">
      <Paper radius="md" p="xl" withBorder shadow="sm">
        <Divider label="Click the button to sign out" labelPosition="center" my="lg" />
        <Group justify="center" mt="xl">
          <Button color="green" onClick={() => signOut(undefined)}>
            Sign out
          </Button>
        </Group>
      </Paper>
    </Flex>
  );
}
