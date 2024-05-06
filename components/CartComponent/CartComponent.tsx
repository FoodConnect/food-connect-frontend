import { Container, Image, Card, Button, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { CartedDonationData } from '../Interfaces/CartedDonationData';

interface CartedDonationProps {
  cartedDonations: CartedDonationData[];
  onUpdateQuantity: (donationId: number, newQuantity: number) => void;
  onDeleteDonation: (donationId: number) => void;
  session: any;
  userCart: any;
}

export default function CartComponent(props: CartedDonationProps) {
  const { session, userCart, onUpdateQuantity } = props;
  const form = useForm({});

  const handleSubmit = async (donationId: number, newQuantity: number) => {
    try {
      if (session) {
        const token = session.access_token;
        const response = await fetch(`http://localhost:8080/carts/${userCart?.id}/update_cart/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ donation_id: donationId, quantity: newQuantity }),
        });

        if (!response.ok) {
          throw new Error('Failed to update cart quantity');
        }

        onUpdateQuantity(donationId, newQuantity);
        showNotification({
          title: 'Success',
          color: 'green',
          message: 'Cart updated!',
        });
        form.reset();
      } else {
        showNotification({
          title: 'Error',
          color: 'red',
          message: 'You must be signed in to update cart.',
        });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      showNotification({
        title: 'Error',
        color: 'red',
        message: 'Sorry, there was an error updating your cart.',
      });
    }
  };

  return (
    <Container my="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {props.cartedDonations.map((donation) => (
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

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const { newQuantity } = form.values as { newQuantity?: number };
                  if (newQuantity !== undefined) {
                    handleSubmit(donation.id!, newQuantity);
                  } else {
                    console.log('No quantity changes.');
                  }
                }}
                >
                  <div style={{ width: '150px', paddingBottom: '10px' }}>
                    <p>Quantity</p>
                    <NumberInput
                      label="Quantity"
                      defaultValue={donation.quantity}
                      placeholder="0"
                      {...form.getInputProps('newQuantity')}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Button type="submit" style={{ marginRight: '10px' }}>
                      Update Donation
                    </Button>
                    <Button onClick={() => props.onDeleteDonation(donation.id!)}>
                      Delete Donation
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
