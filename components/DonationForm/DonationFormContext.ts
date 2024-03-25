// form-context.ts file
import { createFormContext } from '@mantine/form';

interface DonationFormValues {
  title: string;
  image_data: string;
  description: string;
  total_inventory: number;
  claimed_inventory: number;
  remaining_inventory: number;
  pick_up_deadline: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  is_available: boolean;
  donor: number;
}
// You can give context variables any name
export const [DonationFormProvider, useDonationFormContext, useDonationForm] =
  createFormContext<DonationFormValues>();
