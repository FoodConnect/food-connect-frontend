import { Paper, Container, Button } from '@mantine/core';

export default function OrderSummaryComponent() {
return (
  <Container my="md">
    <Paper shadow="md" radius="xs" withBorder p="xl">
      <h3>Order Summary</h3>
      <p>You are ordering X donations today from X local vendors.</p>
      <Button>Checkout</Button>
    </Paper>
  </Container>
);
}
