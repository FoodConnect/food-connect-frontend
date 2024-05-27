import { Grid, Container, Card, Notification } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import OrderSummaryComponent from '@/components/OrderSummaryComponent/OrderSummaryComponent';
import { CartData } from '@/components/Interfaces/CartData';
import { CartedDonationData } from '@/components/Interfaces/CartedDonationData';
import CartComponent from '@/components/CartComponent/CartComponent';
import { NoCartHeroTitle } from '@/components/HeroTitle/NoCartHeroTitle';

export default function CartPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [userCart, setUserCart] = useState<CartData>();
  const [cartedDonations, setCartedDonations] = useState<CartedDonationData[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

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

  const updateCartedDonations = (updatedDonations: CartedDonationData[]) => {
    setCartedDonations(updatedDonations);
  };

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

  const handleCheckout = async () => {
    try {
      const token = session?.access_token;
      const response = await fetch(`http://localhost:8080/carts/${userCart.id}/checkout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to checkout');
      }
      setCheckoutSuccess(true);
    } catch (error) {
      console.error('Error checking out:', error);

      showNotification({
        title: 'Error',
        message: 'Failed to checkout',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout | null = null;

    if (checkoutSuccess) {
      redirectTimer = setTimeout(() => {
        router.push('/Orders/all-orders/');
      }, 3000);
    }

    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [checkoutSuccess, router]);

  return cartedDonations.length === 0 ? (
    <NoCartHeroTitle />
  ) : (
    <Container my="md">
      <h1>Your Cart</h1>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          <Container my="md">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartedDonations.map((cartedDonation) => (
                <CartComponent
                  key={cartedDonation.id}
                  cartedDonations={cartedDonations}
                  updateCartedDonations={updateCartedDonations}
                  cartedDonation={cartedDonation}
                  userCartId={userCart?.id!}
                />
              ))}
            </div>
          </Container>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <OrderSummaryComponent isCartPage onCheckout={handleCheckout} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12 }}>
          <Card h={140} radius="md" bg="teal.2" />
        </Grid.Col>
      </Grid>
      {checkoutSuccess && (
        <Notification
          color="green"
          title="Checkout Successful"
          onClose={() => setCheckoutSuccess(false)}
        >
          Redirecting...
        </Notification>
      )}
    </Container>
  );
}
