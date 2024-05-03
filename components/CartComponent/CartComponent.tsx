import { NumberInput, Container, Image, Card, Button } from '@mantine/core';
import { CartedDonationData } from '../Interfaces/CartedDonationData';

interface CartedDonationProps {
  cartedDonations: CartedDonationData[];
  onUpdateQuantity: (donationId: number, newQuantity: number) => void;
  onDeleteDonation: (donationId: number) => void;
}

export default function CartComponent(props: CartedDonationProps) {
  const handleUpdateQuantity = (donationId: number, newValue: number) => {
    props.onUpdateQuantity(donationId, newValue);
  };

  const handleDeleteDonation = (donationId: number) => {
    props.onDeleteDonation(donationId);
  };

  return (
    <Container my="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {props?.cartedDonations.map((donation) => (
          <Card key={donation.id} shadow="xs" padding="md" withBorder style={{ width: '100%' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '200px', flexShrink: 0 }}>
                <Image
                  src={donation.donation?.image_data}
                  alt="Donation Image"
                  fit="contain"
                  width="200px"
                  height="220px"
                />
              </div>
              <div style={{ flex: 1, paddingLeft: '20px' }}>
                <h3>{donation.donation?.description}</h3>
                <p>{donation.donation?.donor?.business_name}</p>

                <div style={{ width: '200px' }}>
                  <NumberInput
                    radius="sm"
                    label="Quantity"
                    variant="filled"
                    value={donation.quantity}
                    onChange={(value) => handleUpdateQuantity(donation.id!, value)}
                    style={{ paddingBottom: '10px' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <Button
                    onClick={() => handleUpdateQuantity(donation.id!, donation.quantity!)}
                    style={{ marginRight: '10px' }}
                  >
                    Update Donation
                  </Button>
                  <Button onClick={() => handleDeleteDonation(donation.id!)}>
                    Delete Donation
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
