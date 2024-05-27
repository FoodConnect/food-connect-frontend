import { Container, Image, Card, Divider } from '@mantine/core';
import { OrderedDonationData } from '../Interfaces/OrderedDonationData';

interface OrderedDonationProps {
 ordered_donations:OrderedDonationData[]
}

export default function OrderDetailsComponent(props: OrderedDonationProps) {
  return (
    <Container my="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      <Card shadow="xs" padding="md" withBorder style={{ width: '100%' }}>
        {props?.ordered_donations.map((ordered_donation) => (
            <div style={{ display: 'flex' }}>
              <div style={{ width: '200px', flexShrink: 0 }}>
                <Image src={ordered_donation.donation?.image_data} alt="Donation Image" fit="contain" width="100px" height="120px" />
              </div>
              <div style={{ flex: 1, paddingLeft: '20px' }}>
                <h4>{ordered_donation.donation?.description}</h4>
                <p>Quantity: {ordered_donation.quantity}</p>
                <p>Donated by {ordered_donation.donation?.donor?.business_name}</p>
                <p>Pickup Deadline: {ordered_donation.donation?.pick_up_deadline}</p>
                <p>Pickup Address: {ordered_donation.donation?.address},
                 {ordered_donation.donation?.city},
                 {ordered_donation.donation?.state},
                 {ordered_donation.donation?.zipcode}
                </p>
                <Divider />
              </div>
            </div>
        ))}
      </Card>
      </div>
    </Container>
  );
}
