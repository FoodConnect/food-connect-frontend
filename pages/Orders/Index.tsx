import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Container, Loader, Alert } from '@mantine/core';
import OrdersIndexComponent from '@/components/OrdersIndexComponent/OrdersIndexComponent';

async function getData(token: string) {
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

export default function OrderIndexPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session) {
      getData(session.access_token)
        .then(data => {
          setOrders(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [session]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Alert color="red">{error}</Alert>;
  }

  return (
    <Container my="md">
      <h1>Your Orders</h1>
      <OrdersIndexComponent orders={orders} />
    </Container>
  );
}
