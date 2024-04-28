import { NumberInput, Container, Image, Card } from '@mantine/core';
import { CartedDonationData } from '../Interfaces/CartedDonationData';

interface CartedDonationProps {
  carted_donations: CartedDonationData[];
}

export default function CartComponent(props: CartedDonationProps) {
  return (
    <Container my="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {props?.carted_donations.map((donation) => (
          <Card key={donation.id} shadow="xs" padding="md" withBorder style={{ width: '100%' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '200px', flexShrink: 0 }}>
                <Image src={donation.donation?.image_data} alt="Donation Image" fit="contain" width="200px" height="220px" />
              </div>
              <div style={{ flex: 1, paddingLeft: '20px' }}>
                <h3>{donation.donation?.description}</h3>
                <p>{donation.donation?.donor?.business_name}</p>
                <h4>Quantity: {donation.quantity}</h4>
                <div style={{ width: '200px' }}>
                  <NumberInput radius="sm" defaultValue={1} />
                </div>
                <p>Delete Donation</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
