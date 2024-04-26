import { Text, Group, Paper, Button, NumberInput } from '@mantine/core';
import { IconShoppingCart, IconDeviceAnalytics } from '@tabler/icons-react';
// import { showNotification } from '@mantine/notifications';
// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';

export default function AddToCartComponent() {
  // const [carted_donations, setCartedDonations] = useState([]);

  // const AddtoCartValues: {
  //   donation_id: number;
  //   quantity: number;
  // }

  // const handleCreateCartedDonation = () => {
  //   await fetch('http://localhost:8080/carts/add_to_cart/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(donation_id: 3, quantity ),
  //     })
  // }

  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Group align="flex-end" gap="xs">
          <Text c="grey" fz="sm" fw={700}>
            <span>
              <IconShoppingCart />
            </span>
          </Text>
        </Group>
        <IconDeviceAnalytics size="1.4rem" stroke={1.5} />
      </Group>
      <h4>Quantity</h4>
      <NumberInput
        // label="Quantity"
        // required
        // {AddtoCartValues('quantity')}
        placeholder="0"
      />
      <Group justify="space-between" mt="xl">
      <Button type="submit" color="green"> Add to Cart </Button>
      </Group>
    </Paper>
  );
}
