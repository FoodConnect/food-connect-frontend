import { Title, Text, Flex, Button, Image } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        From{' '}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'navy', to: 'chartreuse' }}
        >
          Surplus{' '}
        </Text>
        to{' '}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'navy', to: 'chartreuse' }}
        >
          Purpose{' '}
        </Text>
      </Title>
      <Flex justify="center">
        <Image src="/logo.svg" alt="Food Connect Logo" width={200} height={200} />
      </Flex>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Food Connect rescues food from being thrown away and redirects it to community members who need it.{' '}
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
