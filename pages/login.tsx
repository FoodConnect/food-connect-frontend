import { signIn } from 'next-auth/react';
import { Box, Button, Text, Stack } from '@mantine/core';
import { AuthenticationForm } from '@/components/AuthenticationForm/AuthenticationForm';

export default function Login() {
  return (
    <Box m={8}>
      <Stack>
        <Text>You are not authenticated.</Text>
        <Button color="green" onClick={() => signIn(undefined, { callbackUrl: '/profile' })}>
          Sign in
        </Button>
      </Stack>
      <AuthenticationForm />
    </Box>
  );
}
