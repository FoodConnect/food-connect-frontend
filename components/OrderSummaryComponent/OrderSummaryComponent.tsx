import { Paper, Container} from '@mantine/core';

export default function OrderSummaryComponent() {
return (
  <Container my="md">
    <Paper shadow="md" radius="xs" withBorder p="xl">
      <h2>Order Summary</h2>
      <p>You are ordering X donations today from X local vendors.</p>
    </Paper>
  </Container>
);
}
