import { signIn, signOut, useSession } from 'next-auth/react';
import { Box, Button, Text, Stack, Loader, Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { AuthenticationForm } from '@/components/AuthenticationForm/AuthenticationForm';

export default function SignIn() {
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

  // If the user is authenticated redirect to `/profile`
  if (session) {
    console.log('SESSION');
    router.push('/');
    // eslint-disable-next-line consistent-return
    return;
  }

  // Redirect to Sign Up Page
  return (
    <Box m={8}>
      <Stack>
        <Text>You are not authenticated.</Text>
        <Button color="green" onClick={() => signIn(undefined, { callbackUrl: '/' })}>
          Sign in
        </Button>
        <Button color="green" onClick={() => signOut(undefined)}>
          Sign out
        </Button>
      </Stack>
      <AuthenticationForm />
    </Box>
  );
}