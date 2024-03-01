import { Title, Text, Anchor, Flex, Button } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit index.tsx file.
      </Text>
      <Flex
        mih={50}
        bg="theme.colors.myPalette.9"
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <Button color="chartreuse">chartreuse</Button>
        <Button color="shrek">shrek</Button>
        <Button color="sage">sage</Button>
        <Button color="green">green</Button>
        <Button color="emerald">emerald</Button>
        <Button color="teal">teal</Button>
        <Button color="sky">sky</Button>
        <Button color="blue">blue</Button>
        <Button color="navy">navy</Button>
      </Flex>
    </>
  );
}
