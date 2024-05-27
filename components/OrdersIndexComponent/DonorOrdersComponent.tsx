import { Card, Container, Divider, Image } from '@mantine/core';
import Link from 'next/link';
import { OrderedDonationData } from '../Interfaces/OrderedDonationData';

interface DonorOrdersComponentProps {
  ordered_donations: OrderedDonationData[];
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

export default function DonorOrdersComponent({ ordered_donations }: DonorOrdersComponentProps) {
  return (
    <Container my="md">
      {ordered_donations.map((ordered_donation) => (
        <Card key={ordered_donation.order?.id} shadow="xs" padding="md" withBorder style={{ marginBottom: '20px', cursor: 'pointer' }}>
          <div style={{ paddingLeft: '20px' }}>
            <Link href={`/Orders/${ordered_donation.order?.id}`} passHref>
              <h3>Order ID: {ordered_donation.order?.id}</h3>
            </Link>
            <h4>Order Placed: {formatDate(ordered_donation.order?.created_at)}</h4>
            <p>Charity: {ordered_donation.order?.charity?.business_name}</p>
            <p>Quantity: {ordered_donation.quantity}</p>
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100px', height: '100px', marginRight: '20px', overflow: 'hidden' }}>
                <Image
                  src={ordered_donation.donation?.image_data || 'Donation Image.png'}
                  alt="Donation Image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{ordered_donation.donation?.title}</p>
                <p style={{ margin: 0 }}>{ordered_donation.donation?.donor?.business_name}</p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </Container>
  );
}
