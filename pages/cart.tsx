import { Grid, Container, Card, Button, Image, NumberInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import OrderSummaryComponent from '@/components/OrderSummaryComponent/OrderSummaryComponent';
import { CartData } from '@/components/Interfaces/CartData';
import { CartedDonationData } from '@/components/Interfaces/CartedDonationData';

export default function CartPage() {
  const { data: session } = useSession();
  const [userCart, setUserCart] = useState<CartData>();
  const [cartedDonations, setCartedDonations] = useState<CartedDonationData[]>([]);
  const [newQuantities, setNewQuantities] = useState<{ [key: string]: number }>({});

  async function fetchData() {
    if (!session) {
      throw new Error('User not authenticated');
    }

    const token = session.access_token;
    const response = await fetch('http://localhost:8080/carts/cart_for_current_user/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  }

  useEffect(() => {
    if (!session) return;

    async function getData() {
      try {
        const data = await fetchData();
        setUserCart(data);
        setCartedDonations(data.carted_donations);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    }

    getData();
  }, [session]);

 // Function to handle quantity update
 const handleUpdateQuantity = async (donationId: number) => {
  console.log('DONATION ID: ', donationId);
  try {
    const token = session?.access_token;
    const response = await fetch(`http://localhost:8080/carts/${userCart?.id}/update_cart/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        donation_id: donationId,
        quantity: newQuantities[String(donationId)],
      }),
    });

    console.log(JSON.stringify({
      donation_id: donationId,
      quantity: newQuantities[String(donationId)],
    }));

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

  // Function to handle quantity change in NumberInput
  const handleQuantityChange = (value: string | number, donationId: number) => {
    setNewQuantities((prevQuantities) => ({
      ...prevQuantities,
      [String(donationId)]: typeof value === 'string' ? parseInt(value, 10) : value,
    }));
  };

  const handleDeleteDonation = async (donationId: any) => {
    try {
      const token = session?.access_token;
      await fetch(`http://localhost:8080/carted_donations/${donationId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedDonations = cartedDonations.filter(
        (donation) => donation.id !== donationId
      );

      setCartedDonations(updatedDonations);
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  };

  return (
    <Container my="md">
      <h1>Your Cart</h1>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          <Container my="md">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartedDonations.map((donation) => (
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

                        <div style={{ width: '150px', paddingBottom: '10px' }}>
                          <p>Quantity</p>
                          <NumberInput
                            label="Quantity"
                            value={newQuantities[String(donation.id)] !== undefined ?
                               newQuantities[String(donation.id)].toString() :
                                donation.quantity.toString()}
                            onChange={(value) => handleQuantityChange(value, donation.id!)}
                          />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <Button onClick={() => handleUpdateQuantity(donation.id!)}>
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
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <OrderSummaryComponent isCartPage />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 12 }}>
          <Card h={140} radius="md" bg="teal.2" />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
