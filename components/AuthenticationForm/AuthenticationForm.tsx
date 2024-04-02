import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { getCsrfToken, useSession } from 'next-auth/react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import router from 'next/router';
import { GoogleButton } from './GoogleButton';

interface AuthenticationFormProps {
  username: string;
  password: string;
}

export function AuthenticationForm(
  props: PaperProps,
  { csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [type, toggle] = useToggle(['login', 'register']);
  const { data: session } = useSession();

  // If the user is authenticated redirect to `/profile`
  if (session) {
    router.push('/profile');
    // eslint-disable-next-line consistent-return
    return;
  }

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      // email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      username: (val) =>
        val.length <= 150
          ? null
          : 'Username invalid. Must not exceed 150 characters and be unique.',
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: AuthenticationFormProps) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          showNotification({
            title: 'Error Signing In',
            color: 'red',
            message: 'Sorry, there was an error submitting your request.',
          });
          return response.json();
        }
        showNotification({
          title: 'Logged In!',
          color: 'green',
          message: `You are now logged in as {response}.`,
        });
        router.push('/profile');
        return response.json();
      })
      .catch((error) => {
        if (error !== null) {
          null;
        }
      });
  };

  // eslint-disable-next-line consistent-return
  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => handleSubmit)}>
        <Stack>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Username"
            placeholder="Your Username"
            value={form.values.username}
            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
            error={form.errors.email && 'Invalid username'}
            radius="md"
          />

          <TextInput
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" color="green" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
