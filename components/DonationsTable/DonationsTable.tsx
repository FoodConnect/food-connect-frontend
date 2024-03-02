import { Title, Text, Anchor } from '@mantine/core';
import classes from './DonationsTable.module.css';

export function DonationsTable() {
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
          Table
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This will be a table displaying user donations{' '}
        <Anchor href="/" size="lg">
          more coming soon
        </Anchor>
        . Check back with us later...
      </Text>
    </>
  );
}
