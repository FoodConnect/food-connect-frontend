import { Paper, Container, Title } from '@mantine/core';

export default function OrderSummaryComponent() {
return (
  <Container my="md">
    <Paper shadow="md" radius="xs" withBorder p="xl">
      <Title>Order Summary</Title>
      <h3>You are ordering X donations today!</h3>
    </Paper>
  </Container>
);
}
