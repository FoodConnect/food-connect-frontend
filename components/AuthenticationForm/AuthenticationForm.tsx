import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Grid,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { GoogleButton } from './GoogleButton';

interface AuthenticationFormProps {
  username: string;
  password: string;
}

export function AuthenticationForm() {
  const [type, toggle] = useToggle(['sign in', 'register']);
  const { data: session } = useSession();
  const [csrfToken, setCsrfToken] = useState('');
  // TODO: Reroute to donations page on sign-in
  // If the user is authenticated redirect to `/profile`
  const checkUserType = () => {
    if (session?.user.role === 'donor') {
      return '/Donations/donor-donations';
    }
    if (session?.user.role === 'charity') {
      return '/Donations/charity-donations';
    }
    return '/';
  };

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      name: '',
      password: '',
      terms: true,
      businessName: '',
      role: '',
      einNumber: '',
      imageData: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phoneNumber: '',
    },

    validate: {
      // email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      username: (val) =>
        val.length >= 150
          ? 'Username invalid. Must not exceed 150 characters and be unique.'
          : null,
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      businessName: (val) =>
        val.length > 255 ? 'Business name should not be more than 255 characters' : null,
      einNumber: (val) =>
        val.length > 255 ? 'EIN Number should not be more than 255 characters' : null,
      imageData: (val) =>
        val.length > 255 ? 'Image URL should not be more than 255 characters' : null,
      address: (val) =>
        val.length > 255 ? 'Address should not be more than 255 characters' : null,
      city: (val) => (val.length > 255 ? 'City should not be more than 255 characters' : null),
      state: (val) => (val.length > 255 ? 'State should not be more than 255 characters' : null),
      zipcode: (val) => (val.length > 255 ? 'Zipcode should not be more than 10 characters' : null),
      phoneNumber: (val) =>
        val.length > 255 ? 'Phone number should not be more than 20 characters' : null,
    },
  });

  const handleSubmit = async (values: AuthenticationFormProps) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.status >= 400 && response.status < 600) {
        showNotification({
          title: 'Error Signing In',
          color: 'red',
          message: 'Please verify your username and password and try again.',
        });
        return;
      }
      showNotification({
        title: 'Signed In!',
        color: 'teal',
        message: 'You are now signed in.',
      });
      console.log('RESPONSE: ', response);
      // Authentication successful, sign in the user
      await signIn('credentials', {
        username: values.username,
        password: values.password,
        callbackUrl: await checkUserType(), // Redirect to the donations page after successful login
      });
    } catch (error) {
      console.error('Error logging in:', error);
      showNotification({
        title: 'Error Logging In',
        color: 'red',
        message: 'Sorry, there was an error logging in.',
      });
    }
  };
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      if (token != null) {
        setCsrfToken(token.toString());
      }
      return token;
    };

    fetchCsrfToken();
  }, [session]);

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" fw={500}>
        {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with username" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid grow gutter="xl">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          {type === 'register' && (
            <>
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
                  label="Business Name"
                  placeholder="Perri Farms"
                  value={form.values.businessName}
                  onChange={(event) =>
                    form.setFieldValue('business_name', event.currentTarget.value)
                  }
                  error={form.errors.businessName && 'Invalid business name'}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6 }}>
                <TextInput
                  label="Role"
                  placeholder="Donor / Charity"
                  value={form.values.role}
                  onChange={(event) => form.setFieldValue('role', event.currentTarget.value)}
                  error={form.errors.role && 'Invalid role'}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6 }}>
                <TextInput
                  label="EIN Number"
                  placeholder="1234567"
                  value={form.values.einNumber}
                  onChange={(event) => form.setFieldValue('ein_number', event.currentTarget.value)}
                  error={form.errors.einNumber && 'Invalid EIN Number'}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6 }}>
                <TextInput
                  label="Image URL"
                  placeholder="https://your-image-url.com"
                  value={form.values.imageData}
                  onChange={(event) => form.setFieldValue('image_data', event.currentTarget.value)}
                  error={form.errors.imageData && 'Invalid image URL'}
                  radius="md"
                />
              </Grid.Col>
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
                <TextInput
                  label="Phone Number"
                  placeholder="1234567890"
                  value={form.values.phoneNumber}
                  onChange={(event) =>
                    form.setFieldValue('phone_number', event.currentTarget.value)
                  }
                  error={form.errors.phoneNumber && 'Invalid phone number'}
                  radius="md"
                />
              </Grid.Col>
            </>
          )}
          <Grid.Col span={{ base: 12, xs: 12 }}>
            <TextInput
              required
              label="Username"
              placeholder="Your Username"
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              error={form.errors.email && 'Invalid username'}
              radius="md"
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 12 }}>
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />
          </Grid.Col>
        </Grid>

        {type === 'register' && (
          <Checkbox
            mt="xl"
            label="I accept terms and conditions"
            checked={form.values.terms}
            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
          />
        )}

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
