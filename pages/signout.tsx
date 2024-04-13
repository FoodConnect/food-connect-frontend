import { signIn, useSession } from 'next-auth/react';
import { Box, Button, Text, Stack, Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import { AuthenticationForm } from '@/components/AuthenticationForm/AuthenticationForm';

export default function SignOut() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // eslint-disable-next-line eqeqeq
  if (status == 'loading') {
    return <Loader size="lg" color="shrek" />;
  }

  // If the user is authenticated redirect to `/profile`
  if (session) {
    router.push('profile');
    // eslint-disable-next-line consistent-return
    return;
  }

  // Redirect to Sign Up Page
  return (
    <Box m={8}>
      <Stack>
        <Text>You are not authenticated.</Text>
        <Button color="green" onClick={() => signIn(undefined, { callbackUrl: '/profile' })}>
          Sign in
        </Button>
        <Button color="green" onClick={() => signIn(undefined, { callbackUrl: '/profile' })}>
          Sign in
        </Button>
      </Stack>
      <AuthenticationForm />
    </Box>
  );
}
