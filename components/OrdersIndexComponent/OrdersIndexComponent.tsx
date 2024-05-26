import { Container, Card, Divider, Image } from '@mantine/core';
import Link from 'next/link';
import { OrderData } from '../Interfaces/OrderData';

interface OrderDataProps {
  orders: OrderData[];
}

function formatDate(dateString?: string): string {
  if (!dateString) return 'Date not available';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function OrdersIndexComponent({ orders }: OrderDataProps) {
  return (
    <Container my="md">
      {orders.map((order) => (
          <Card shadow="xs" padding="md" withBorder style={{ marginBottom: '20px', cursor: 'pointer' }}>
            <div style={{ paddingLeft: '20px' }}>
              <Link href={`/Orders/${order.id}`} key={order.id} passHref>
                <h3>Order ID: {order.id}</h3>
              </Link>
              <h4>Order Placed: {formatDate(order.created_at)}</h4>
              <Divider />
              <div>
                {order.ordered_donations?.map((donation) => (
                  <div key={donation.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ width: '100px', height: '100px', marginRight: '20px', overflow: 'hidden' }}>
                      <Image
                        src={donation?.donation?.image_data || 'Donation Image.png'}
                        alt="Donation Image"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 'bold' }}>{donation?.donation?.title}</p>
                      <p style={{ margin: 0 }}>{donation?.donation?.donor?.business_name}</p>
                      <p style={{ margin: 0 }}>Quantity: {donation?.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Divider />
            </div>
          </Card>
      ))}
    </Container>
  );
}
