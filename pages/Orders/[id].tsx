import { Container } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import OrderDetailsComponent from '@/components/OrderDetailsComponent/OrderDetailsComponent';
import OrderSummaryComponent from '@/components/OrderSummaryComponent/OrderSummaryComponent';

export default function OrderPage() {
  const router = useRouter();
  const { id }: any = router.query;
  const { data: session } = useSession();
  const [ordered_donations, setOrderedDonations] = useState([]);

  async function getData() {
    if (!session) {
      throw new Error('User not authenticated');
    }

    const token = session.access_token;
    const response = await fetch(`http://localhost:8080/orders/${id}/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json(); //add quantities here in function than pass to props for order summary
  }

  useEffect(() => {
    if (!id || !session) return;

    const fetchData = async () => {
      try {
        const data = await getData();
        setOrderedDonations(data.ordered_donations);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };
    fetchData();
  }, [id, session]);

  return (
      <Container my="md">
        <h1>Order #{id} Details</h1>
        <OrderSummaryComponent isCartPage={false} />
        <OrderDetailsComponent ordered_donations={ordered_donations} />
      </Container>
  );
}
