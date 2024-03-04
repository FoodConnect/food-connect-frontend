import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { ApplicationContainer } from '@/components/ApplicationContainer';

// Dummy User ID and Role for feaux authorization
const dummyUser = { id: 2, role: 'donor' };
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Mantine Template</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <ApplicationContainer>
        <Component {...pageProps} dummyUser={dummyUser} />
      </ApplicationContainer>
    </MantineProvider>
  );
}
