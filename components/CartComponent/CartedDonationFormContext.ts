import { createFormContext } from '@mantine/form';

interface CartedDonationFormValues {
  cart_id: number;
  donation_id: number;
  quantity: number;
}

// You can give context variables any name
export const [CartedDonationFormProvider, useCartedDonationFormContext, useCartedDonationForm] =
  createFormContext<CartedDonationFormValues>();
