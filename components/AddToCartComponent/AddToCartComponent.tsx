import { useEffect } from 'react';
import { Text, Group, Paper, Button, NumberInput } from '@mantine/core';
import { IconShoppingCart, IconDeviceAnalytics } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { showNotification } from '@mantine/notifications';
import { createCartedDonation } from '@/utils/createCartedDonation';
import { CartedDonationData } from '../Interfaces/CartedDonationData';

export default function AddToCartComponent() {
  const { data: session } = useSession();
  const form = useForm({
    initialValues: {
      donation_id: 3,
      quantity: 0,
    },
  });

   // Form Submission Method
   const handleSubmit = async (values: CartedDonationData) => {
    try {
      if (session) {
        await createCartedDonation(values);
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
      <Button type="submit" color="green"> Add to Cart </Button>
      </Group>
      </form>
    </Paper>
  );
}
