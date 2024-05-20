import { DonationData } from './DonationData';

export interface OrderedDonationData {
  id?: number;
  quantity?: number;
  donation?: DonationData;
  order?: {
    id?: number;
    created_at?: string;
    charity_id?: number;
    donation_receipt?: string;
  }
}
