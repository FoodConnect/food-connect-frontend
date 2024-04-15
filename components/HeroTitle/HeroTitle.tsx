import { Container, Text, Button, Group } from '@mantine/core';
import Link from 'next/link';
import classes from './HeroTitle.module.css';

export function HeroTitle() {
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
            Sign In
          </Text>{' '}
          To view this page
        </h1>

        <Text className={classes.description} color="dimmed">
          Please sign in or sign up for a free account to veiw this page and get the full Food
          Connect exerience.
        </Text>

        <Group className={classes.controls}>
          <Button
            component={Link}
            href="/signin"
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Sign In
          </Button>
        </Group>
      </Container>
    </div>
  );
}
