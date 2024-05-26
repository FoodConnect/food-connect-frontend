import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import OrdersIndexComponent from '@/components/OrdersIndexComponent/OrdersIndexComponent';
import { OrderData } from '@/components/Interfaces/OrderData';

export default function OrderIndexPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
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

    return response.json();
  }

  useEffect(() => {
    if (!session) return;

    async function getData() {
      try {
        const data = await fetchData();
        setOrders(data); // No need for filtering here
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order data', error);
        showNotification({
          title: 'Error',
          message: 'Failed to fetch order data',
          color: 'red',
        });
        setLoading(false);
      }
    }
    getData();
  }, [session]);

  if (loading) {
    return (
      <Container my="md">
        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Container my="md">
      <h1>Your Orders</h1>
      <OrdersIndexComponent orders={orders} />
    </Container>
  );
}
