import { Card, Container, Divider, Image } from '@mantine/core';
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
  ordered_donations.sort((a, b) => {
    const dateA = new Date(a.order?.created_at || '');
    const dateB = new Date(b.order?.created_at || '');
    return dateB.getTime() - dateA.getTime();
  });
  return (
    <Container my="md">
      {ordered_donations.map((ordered_donation) => (
        <Card key={ordered_donation.order?.id} shadow="xs" padding="md" withBorder style={{ marginBottom: '20px', cursor: 'pointer' }}>
          <div style={{ paddingLeft: '20px' }}>
              <h3>Order ID: {ordered_donation.order?.id}</h3>
            <h4>Order Placed: {formatDate(ordered_donation.order?.created_at)}</h4>
            <p>Ordered by: {ordered_donation.order?.charity?.user?.business_name}</p>
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
                <p style={{ margin: 0 }}>Quantity:
                {ordered_donation.quantity}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </Container>
  );
}
