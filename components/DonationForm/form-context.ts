// form-context.ts file
import { createFormContext } from '@mantine/form';
import { DonationData } from '../Interfaces/DonationData';

// You can give context variables any name
export const [DonationFormProvider, useDonationFormContext, useDonationForm] =
  createFormContext<DonationData>();
