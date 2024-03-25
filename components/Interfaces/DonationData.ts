export interface DonationData {
  id?: number;
  claimed_inventory?: number;
  remaining_inventory?: number;
  total_inventory?: number;
  title?: string;
  pick_up_deadline?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  description?: string;
  is_available?: boolean;
  image_data?: string;
  donor?: number;
  created_at?: string;
}

export type DonationsContextType = {
  donationsTableData: DonationData[];
  saveDonation: (donation: DonationData) => void;
  updateDonation: (id: number) => void;
};
