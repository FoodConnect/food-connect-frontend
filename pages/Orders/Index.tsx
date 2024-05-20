import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import OrdersIndexComponent from '@/components/OrdersIndexComponent/OrdersIndexComponent';

export default function OrderIndexPage() {
  const { data: session } = useSession();
  const [ordered_donations, setOrderedDonations] = useState([]);

  async function getData() {
    if (!session) {
      throw new Error('User not authenticated');
    }

    const token = session.access_token;
    const response = await fetch('http://localhost:8080/orders/', {
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
    if (!session) return;

    const fetchData = async () => {
      try {
        const data = await getData();
        setOrderedDonations(data.ordered_donations);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };
    fetchData();
  }, [session]);

  return (
    <Container my="md">
        <h1>Your Orders</h1>
        <OrdersIndexComponent ordered_donations={ordered_donations} />
    </Container>
  );
}
