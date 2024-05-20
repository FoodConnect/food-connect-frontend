import { Container, Text, Button, Group } from '@mantine/core';
import Link from 'next/link';
import classes from './HeroTitle.module.css';

export function OrderSuccessHeroTitle() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Order{' '}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'navy', to: 'chartreuse' }}
            inherit
          >
            Success!
          </Text>{' '}
        </h1>

        <Text className={classes.description} color="dimmed">
          Thank you for your order. View your order details below.
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
            View Orders
          </Button>
        </Group>
      </Container>
    </div>
  );
}
