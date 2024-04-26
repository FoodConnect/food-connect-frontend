import { CartedDonationData } from '@/components/Interfaces/CartedDonationData';

export async function createCartedDonation(values: CartedDonationData) {
  try {
    const response = await fetch('http://localhost:8080/carts/add_to_cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
}
