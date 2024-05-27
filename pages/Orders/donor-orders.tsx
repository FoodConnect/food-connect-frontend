import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import DonorOrdersComponent from '@/components/OrdersIndexComponent/DonorOrdersComponent';
import { OrderedDonationData } from '@/components/Interfaces/OrderedDonationData';

export default function DonorOrdersPage() {
  const { data: session } = useSession();
  const [ordered_donations, setOrderedDonations] = useState<OrderedDonationData[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    if (!session) {
      throw new Error('User not authenticated');
    }

    const token = session.access_token;
    const response = await fetch('http://localhost:8080/ordered_donations/', {
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
        setOrderedDonations(data);
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
      <DonorOrdersComponent ordered_donations={ordered_donations} />
    </Container>
  );
}
