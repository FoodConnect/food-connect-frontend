export interface DonationFormValues {
  title?: string;
  image_data?: string;
  description?: string;
  total_inventory?: number;
  claimed_inventory?: number;
  remaining_inventory?: number;
  pick_up_deadline?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  is_available?: boolean;
  donor_id?: number;
}
