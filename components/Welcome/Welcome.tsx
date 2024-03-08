import { Title, Text, Anchor, Flex, Button, Image } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        This Will Be a{' '}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'navy', to: 'chartreuse' }}
        >
          Landing{' '}
        </Text>
        Page
      </Title>
      <Flex justify="center">
        <Image src="/logo.svg" alt="Food Connect Logo" width={200} height={200} />
      </Flex>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This will be a landing page with information on the site and data on donations
        given/received.{' '}
        <Anchor href="/" size="lg">
          more coming soon
        </Anchor>
        . Check back with us later...
      </Text>
      <Flex
        mt="xl"
        mih={50}
        gap="md"
        justify="center"
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
