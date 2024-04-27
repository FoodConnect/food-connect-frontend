import { Paper, Container, Button } from '@mantine/core';

interface OrderSummaryProps {
  isCartPage: boolean;
}

export default function OrderSummaryComponent({ isCartPage }: OrderSummaryProps) {
  return (
    <Container my="md">
      <Paper shadow="md" radius="xs" withBorder p="xl">
        <h3>Order Summary</h3>
        <p>April 27, 2024</p>
        <p>X donations from X local vendors.</p>
        {isCartPage ? <Button color="green">Checkout</Button> : null}
      </Paper>
    </Container>
  );
}
