import { Grid, Container, Card } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
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
    const response = await fetch(`http://localhost:8080/carts/${id}/`, {
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
        setCartedDonations(data.carted_donations);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchData();
  }, [id, session]);

  return (
    <Container my="md">
      <h1>Your Cart</h1>
      <p>Cart ID: {router.query.id}</p>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          <CartComponent carted_donations={carted_donations} />
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
