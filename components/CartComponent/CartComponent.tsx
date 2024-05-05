import { useState } from 'react';
import { Container, Image, Card, Button } from '@mantine/core';
import { CartedDonationData } from '../Interfaces/CartedDonationData';

interface CartedDonationProps {
  cartedDonations: CartedDonationData[];
  onUpdateQuantity: (donationId: number, newQuantity: number) => void;
  onDeleteDonation: (donationId: number) => void;
}

export default function CartComponent(props: CartedDonationProps) {
  const [value, setValue] = useState<number>(0);

  const handleUpdateQuantity = (donationId: number) => {
    props.onUpdateQuantity(donationId, value);
  };

  const handleDeleteDonation = (donationId: number) => {
    props.onDeleteDonation(donationId);
  };

  return (
    <Container my="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {props?.cartedDonations.map((donation) => (
          <Card key={donation.id} shadow="xs" padding="md" withBorder style={{ width: '100%' }}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleUpdateQuantity(donation.id);
              }}
            >
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

                  <div style={{ width: '150px', paddingBottom: '10px' }}>
                    <p>Quantity</p>
                    <input
                      type="number"
                      defaultValue={donation.quantity}
                      onChange={(event) => setValue(parseInt(event.target.value, 10))}
                      style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', width: '150px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Button type="submit" style={{ marginRight: '10px' }}>
                      Update Donation
                    </Button>
                    <Button onClick={() => handleDeleteDonation(donation.id!)}>
                      Delete Donation
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Card>
        ))}
      </div>
    </Container>
  );
}
