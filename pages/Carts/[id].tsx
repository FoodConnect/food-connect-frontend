import { Grid, Container, Card } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import CartComponent from '@/components/CartComponent/CartComponent';
import OrderSummaryComponent from '@/components/OrderSummaryComponent/OrderSummaryComponent';

export default function CartPage() {
  const router = useRouter();
  const { id }: any = router.query;
  const { data: session } = useSession();
  const [carted_donations, setCartedDonations] = useState([]);

  async function getData() {
    if (!session) {
      throw new Error('User not authenticated');
    }

    const token = session.access_token;
    const response = await fetch(`http://localhost:8080/carts/${id}`, {
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
    if (!id || !session) return;

    const fetchData = async () => {
      try {
        const data = await getData();
        console.log(data);
        setCartedDonations(data.carted_donations);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchData();
  }, [id, session]);

  // update quantity, aka remove item from cart
  const handleUpdateQuantity = async (donationId: any, newQuantity: any) => {
    try {
      const token = session?.access_token;
      await fetch(`http://localhost:8080/carts/${id}/remove_from_cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ donation_id: donationId, quantity: newQuantity }),
      });

      const updatedDonations = carted_donations.map(donation => {
        if (donation.id === donationId) {
          return { ...donation, quantity: newQuantity };
        }
        return donation;
      });
      setCartedDonations(updatedDonations);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // delete, aka remove carted donation
  const handleDeleteDonation = async (donationId: any) => {
    try {
      const token = session?.access_token;
      await fetch(`http://localhost:8080/carted_donations/${donationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedDonations = carted_donations.filter(donation => donation.id !== donationId);
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
            carted_donations={carted_donations}
            onUpdateQuantity={handleUpdateQuantity}
            onDeleteDonation={handleDeleteDonation}
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
