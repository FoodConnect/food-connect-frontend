import { DonationData } from './DonationData';

export interface OrderData {
  id?: number;
  created_at?: string;
  donation_receipt?: string;
  charity?: {
    user_id?: number;
    business_name?: string;
    city?: string;
    email?: string;
    image_data?: string;
    phone_number?: string;
    state?: string;
  }
  ordered_donations?: [
    {
      id?: number;
      donation?: DonationData;
      quantity?: number
    }
  ];
}
