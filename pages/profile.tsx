import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Box, Button, Code, Loader, Text, Stack, Center } from '@mantine/core';
import axios from 'axios';

export default function Home() {
  const { data: session, status } = useSession({ required: true });
  const [response, setResponse] = useState('{}');

  const getUserDetails = async (useToken: boolean) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/`,
        headers: useToken ? { Authorization: `Bearer ${session?.access_token}` } : {},
      });
      setResponse(JSON.stringify(res.data));
      console.log(res.data);
    } catch (error) {
      if (error instanceof Error) {
        setResponse(error.message);
      }
    }
  };

  if (status === 'loading') {
    return (
      <Center>
        <Loader size="xl" color="navy" type="dots" />
      </Center>
    );
  }

  if (session) {
    return (
      <Box m={8}>
        <Stack>
          <Text>PK: {session.user.pk}</Text>
          <Text>Username: {session.user.username}</Text>
          <Text>Role: {session.user.role}</Text>
          <Code>{response}</Code>
        </Stack>
        <Stack justify="center" mt={4}>
          <Button color="green" onClick={() => getUserDetails(true)}>
            User details (with token)
          </Button>
          <Button color="teal" onClick={() => getUserDetails(false)}>
            User details (without token)
          </Button>
          <Button color="navy" onClick={() => signOut({ callbackUrl: '/' })}>
            Sign out
          </Button>
        </Stack>
      </Box>
    );
  }

  return <></>;
}
