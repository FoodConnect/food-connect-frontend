import { Grid, Container, Card } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CartComponent from '@/components/CartComponent/CartComponent';
import OrderSummaryComponent from '@/components/OrderSummaryComponent/OrderSummaryComponent';
import { CartData } from '@/components/Interfaces/CartData';
import { CartedDonationData } from '@/components/Interfaces/CartedDonationData';

export default function Cart() {
  const { data: session } = useSession();
  const [userCart, setUserCart] = useState<CartData>();
  const [cartedDonations, setCartedDonations] = useState<CartedDonationData[]>([]);

  async function fetchData() {
    if (!session) {
      throw new Error('User not authenticated');
    }

    const token = session.access_token;
    const response = await fetch('http://localhost:8080/carts/cart_for_current_user/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  }

  useEffect(() => {
    if (!session) return;

    async function getData() {
      try {
        const data = await fetchData();
        setUserCart(data);
        setCartedDonations(data.carted_donations);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    }

    getData();
  }, [session]);

  const handleUpdateQuantity = async (donationId: number, newQuantity: number) => {
    try {
      const token = session?.access_token;
      const response = await fetch(`http://localhost:8080/carts/${userCart?.id}/update_cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ donation_id: donationId, quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart quantity');
      }

      const updatedDonations = cartedDonations.map((donation) => {
        if (donation.id === donationId) {
          return { ...donation, quantity: newQuantity };
        }
        return donation;
      });

      setCartedDonations(updatedDonations);

      showNotification({
        title: 'Success',
        color: 'green',
        message: 'Quantity updated!',
      });
    } catch (error) {
      console.error('Error updating quantity:', error);

      showNotification({
        title: 'Error',
        message: 'Failed to update quantity',
        color: 'red',
      });
    }
  };

  const handleDeleteDonation = async (donationId: any) => {
    try {
      const token = session?.access_token;
      await fetch(`http://localhost:8080/carted_donations/${donationId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedDonations = cartedDonations.filter(
        (donation) => donation.id !== donationId
      );

      setCartedDonations(updatedDonations);
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  };

  return (
    <Container my="md">
      <h1>Your Cart</h1>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          <CartComponent
            cartedDonations={cartedDonations}
            onUpdateQuantity={handleUpdateQuantity}
            onDeleteDonation={handleDeleteDonation}
            session={session}
            userCart={userCart}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <OrderSummaryComponent isCartPage />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 12 }}>
          <Card h={140} radius="md" bg="teal.2" />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
