import { DonationData } from './DonationData';

export interface OrderedDonationData {
  id?: number;
  quantity?: number;
  donation?: DonationData;
  order?: number;
}
