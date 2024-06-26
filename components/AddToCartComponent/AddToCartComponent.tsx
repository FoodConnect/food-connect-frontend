import { useEffect } from 'react';
import { Text, Group, Paper, Button, NumberInput } from '@mantine/core';
import { IconShoppingCart, IconDeviceAnalytics } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { CartedDonationData } from '../Interfaces/CartedDonationData';

export default function AddToCartComponent() {
  const { data: session } = useSession();
  const router = useRouter();

   // Get the donation ID from the URL
   const { id } = router.query;

  const form = useForm({
    initialValues: {
      donation_id: parseInt(id as string, 10),
      quantity: 0,
    },
  });

  // Form Submission Method
  const handleSubmit = async (values: CartedDonationData) => {
    try {
      if (session) {
        const token = session.access_token;
        const response = await fetch('http://localhost:8080/carts/add_to_cart/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }

        await response.json(); // will need to add useState here

        showNotification({
          title: 'Success',
          color: 'green',
          message: 'Donation added to cart.',
        });
        form.reset();
      } else {
        showNotification({
          title: 'Error',
          color: 'red',
          message: 'You must be signed in to add to a cart.',
        });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      showNotification({
        title: 'Error',
        color: 'red',
        message: 'Sorry, there was an error adding to your cart.',
      });
    }
  };

  useEffect(() => {}, [session]);

  if (!session) {
    return (
      <div>
        <Link href="/signin">You must be signed in to add to a cart.</Link>
      </div>
    );
  }

  return (
    <Paper withBorder p="md" radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
        <h4>Claim Donation</h4>
        <NumberInput
          label="Quantity"
          key={form.values.quantity}
          placeholder="0"
          {...form.getInputProps('quantity')}
        />
        <Group justify="space-between" mt="xl">
          <Button type="submit" color="green">
            Add to Cart
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
