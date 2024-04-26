import { Text, Group, Paper, Button, NumberInput } from '@mantine/core';
import { IconShoppingCart, IconDeviceAnalytics } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

export default function AddToCartComponent() {
  const form = useForm({
    initialValues: {
      donation_id: 3,
      quantity: 0,
    },
  });

  return (
    <Paper withBorder p="md" radius="md">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
