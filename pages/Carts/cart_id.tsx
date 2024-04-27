import { Grid, Container, Card } from '@mantine/core';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/react';
import CartComponent from '@/components/CartComponent/CartComponent';
import OrderSummaryComponent from '@/components/OrderSummaryComponent/OrderSummaryComponent';
// import { CartedDonationData } from '@/components/Interfaces/CartedDonationData';
// import { getCartedData } from '@/utils/getCartedData';
// import { useRouter } from 'next/router';

export default function CartPage() {
  // const [domLoaded, setDomLoaded] = useState(false);
  // const [carted_donations, setCartedDonations] = useState<CartedDonationData>({});
  // const router = useRouter();

  //**REMOVE */
  const items = [
    { id: 1, donation_title: 'Cereal', image_url: 'https://www.cheerios.com/_next/image?url=https%3A%2F%2Fprodcontent.cheerios.com%2Fwp-content%2Fuploads%2F2023%2F12%2FCheerios-Original-Cereal-460x460-1.png&w=1024&q=75', description: 'Cheerios boxed cereal', donor: 'Jewel Osco', quantity: 2 },
    { id: 2, donation_title: 'Bread', image_url: 'https://waterbutlers.com/cdn/shop/products/bread1_f60dedf3-6817-45c3-bdf0-accc3fb0ded6_600x.jpg?v=1606190246', description: 'Wonderbread Loaf', donor: 'Fresh Thyme', quantity: 3 },
    { id: 3, donation_title: 'Pinneaple', image_url: 'https://target.scene7.com/is/image/Target/GUEST_a99d0f27-a426-4276-bfbf-bbcda275c9cb?wid=488&hei=488&fmt=pjpeg', description: 'Canned pinneaple slices', donor: 'Piggly Wiggly', quantity: 4 },
];

  return (

      <Container my="md">
        <h1>Your Cart</h1>
        <Grid>
          <Grid.Col span={{ base: 12, xs: 8 }}><CartComponent items={items} /></Grid.Col>

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
