import React from 'react';
import { Paper, Container, Button } from '@mantine/core';

interface OrderSummaryProps {
  onCheckout: () => void;
  isCartPage: boolean;
}

export default function OrderSummaryComponent({ onCheckout, isCartPage }:OrderSummaryProps) {
  return (
    <Container my="md">
      <Paper shadow="md" radius="xs" withBorder p="xl">
        <h3>Order Summary</h3>
        <p>April 27, 2024</p>
        <p>X donations from X local vendors.</p>
        {isCartPage ?
        <Button onClick={onCheckout} color="green" fullWidth>
          Checkout
        </Button> : null}
      </Paper>
    </Container>
  );
}
