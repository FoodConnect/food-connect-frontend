import { DonationData } from './DonationData';

export interface DonationSearchProps {
  donations: DonationData[];
  onShowDonation: (donation: DonationData) => void;
}
