export interface DonationData {
  claimed_inventory: number;
  remaining_inventory: number;
  total_inventory: number;
  title: string;
  pick_up_deadline: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  description: string;
  is_available: boolean;
  image_data: string;
  donor: number;
}
