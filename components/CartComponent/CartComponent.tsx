import { useEffect, useState } from 'react';
import { Card, Button, Image, NumberInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useSession } from 'next-auth/react';
import { CartedDonationData } from '@/components/Interfaces/CartedDonationData';

interface CartProps {
  cartedDonation: CartedDonationData;
  userCartId: number;
  cartedDonations: CartedDonationData[];
  updateCartedDonations: (updatedDonations: CartedDonationData[]) => void;
}

const CartComponent = (props: CartProps) => {
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(props.cartedDonation?.quantity ?? 0);

  const handleUpdateQuantity = async () => {
    try {
      const token = session?.access_token;
      const response = await fetch(`http://localhost:8080/carts/${props.userCartId}/update_cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          donation_id: props.cartedDonation?.donation?.id,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart quantity');
      }

      showNotification({
        title: 'Success',
        color: 'green',
        message: 'Quantity updated!',
      });
    } catch (error) {
      console.error('Error updating quantity:', error);

      showNotification({
        title: 'Error',
        message: 'Failed to update quantity',
        color: 'red',
      });
    }
  };

  const handleDeleteDonation = async () => {
    try {
      const token = session?.access_token;
      await fetch(`http://localhost:8080/carted_donations/${props.cartedDonation?.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedDonations = props.cartedDonations.filter(
        (donation) => donation.id !== props.cartedDonation?.donation?.id
      );
      props.updateCartedDonations(updatedDonations);
      showNotification({
        title: 'Success',
        color: 'green',
        message: 'Donation deleted.',
      });
      window.location.reload();
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  };

  useEffect(() => {}, [session]);

  return (
    <Card
      key={props.cartedDonation.id}
      shadow="xs"
      padding="md"
      withBorder
      style={{ width: '100%' }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ width: '200px', flexShrink: 0 }}>
          <Image
            src={props.cartedDonation.donation?.image_data}
            alt="Donation Image"
            fit="contain"
            width="200px"
            height="220px"
          />
        </div>
        <div style={{ flex: 1, paddingLeft: '20px' }}>
          <h3>{props.cartedDonation.donation?.description}</h3>
          <p>{props.cartedDonation.donation?.donor?.business_name}</p>

          <div style={{ width: '150px', paddingBottom: '10px' }}>
            <NumberInput
              label="Quantity"
              value={quantity}
              clampBehavior="strict"
              min={0}
              max={props.cartedDonation.donation?.remaining_inventory}
              onChange={(value) => setQuantity(Number(value))}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Button onClick={() => handleUpdateQuantity()} style={{ marginRight: '10px' }}>Update Donation</Button>
            <Button onClick={() => handleDeleteDonation()}>Delete Donation</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default CartComponent;
