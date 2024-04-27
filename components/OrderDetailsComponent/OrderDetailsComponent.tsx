import { Container, Image, Card, Divider } from '@mantine/core';

interface OrderedDonation {
  order_number: number,
  order_created_at: string,
  donation_title: string,
  donation_image_url: string,
  donation_description: string,
  donation_donor: string,
  donation_pickup_address: string,
  donation_quantity: number
 }

interface OrderedDonationProps {
 ordered_donations:OrderedDonation[]
}

export default function OrderDetailsComponent(props: OrderedDonationProps) {
  return (
    <Container my="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      <Card shadow="xs" padding="md" withBorder style={{ width: '100%' }}>
        <h4>Order #: 1234567</h4>
        {props?.ordered_donations.map((ordered_donation) => (
            <div style={{ display: 'flex' }}>
              <div style={{ width: '200px', flexShrink: 0 }}>
                <Image src={ordered_donation.donation_image_url} alt="Donation Image" fit="contain" width="100px" height="120px" />
              </div>
              <div style={{ flex: 1, paddingLeft: '20px' }}>
                <h4>{ordered_donation.donation_description}</h4>
                <p>Quantity: X</p>
                <p>Donated by {ordered_donation.donation_donor}</p>
                <p>Pickup Address: {ordered_donation.donation_pickup_address}</p>
                <Divider />
              </div>
            </div>
        ))}
      </Card>
      </div>
    </Container>
  );
}
