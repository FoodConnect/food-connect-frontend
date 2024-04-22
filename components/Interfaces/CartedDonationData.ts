export interface CartedDonationData {
  id?: number;
  cart_id?: number;
  quantity?: number;
  donation?: {
    id?: number;
    title?: string;
    description?: string;
    image_data?: string;
    donor?: {
      user_id?: number;
      business_name?: string;
      image_data?: string;
    };
  }
  charity?: {
    id?: number;
    business_name?: string;
    ein_number?: string;
    image_data?: string;
    address?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    email?: string;
    phone_number?: string;
  };
}
