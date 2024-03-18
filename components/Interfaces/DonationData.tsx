export interface DonationData {
  claimed_inventory: number;
  remaining_inventory: number;
  total_inventory: number;
  id: string;
  title: string;
  pick_up_deadline: string;
  donor: number;
  description: string;
  is_available: boolean;
  created_at: string;
  image_data: string;
}
