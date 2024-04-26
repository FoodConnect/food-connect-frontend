import { getSession } from 'next-auth/react';
import { CartedDonationData } from '@/components/Interfaces/CartedDonationData';

export async function createCartedDonation(values: CartedDonationData) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error('User not authenticated');
    }

    const token = session.access_token;

    const response = await fetch('http://localhost:8080/carts/add_to_cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
