import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { Box, Button, Loader, Text, Stack } from '@mantine/core';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loader color="teal" size="lg" type="dots" />;
  }

  // If the user is authenticated redirect to `/profile`
  if (session) {
    router.push('/profile');
    // eslint-disable-next-line consistent-return
    return;
  }

  return (
    <Box m={8}>
      <Stack>
        <Text>You are not authenticated.</Text>
        <Button color="green" onClick={() => signIn(undefined, { callbackUrl: '/profile' })}>
          Sign in
        </Button>
      </Stack>
    </Box>
  );
}
