import { DonationData } from './DonationData';

export interface OrderedDonationData {
  id?: number;
  quantity?: number;
  donation?: DonationData;
  order?: {
    id?: number;
    created_at?: string;
    charity?: {
      user_id?: number;
      business_name?: string;
      city?: string;
      email?: string;
      image_data?: string;
      phone_number?: string;
      state?: string;
    }
    donation_receipt?: string;
  }
}
