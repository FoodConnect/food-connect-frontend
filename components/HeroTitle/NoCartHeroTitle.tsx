import { Container, Text, Button, Group } from '@mantine/core';
import Link from 'next/link';
import classes from './HeroTitle.module.css';

export function NoCartHeroTitle() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Please{' '}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'navy', to: 'chartreuse' }}
            inherit
          >
            Claim a Donation
          </Text>{' '}
          to view your cart
        </h1>

        <Text className={classes.description} color="dimmed">
          Your cart is empty. Check out available donations below!
        </Text>

        <Group className={classes.controls}>
          <Button
            component={Link}
            href="/"
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            View Donations
          </Button>
        </Group>
      </Container>
    </div>
  );
}
