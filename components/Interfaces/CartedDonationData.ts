import { DonationData } from './DonationData';

export interface CartedDonationData {
  id?: number;
  cart_id?: number;
  quantity?: number;
  donation?: DonationData;
}
