export interface CartData {
    id?: number;
    status?: string;
    created_at?: string;
    updated_at?: string;
    charity?: {
      user_id?: number;
      business_name?: string;
      city?: string;
      email?: string;
      image_data?: string;
      phone_number?: string;
      state?: string;
    };
}
