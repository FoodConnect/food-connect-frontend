import { Container } from '@mantine/core';
import OrderDetailsComponent from '@/components/OrderDetailsComponent/OrderDetailsComponent';
import OrderSummaryComponent from '@/components/OrderSummaryComponent/OrderSummaryComponent';

export default function OrderPage() {
  const ordered_donations = [
    { order_number: 12345, order_created_at: 'April 27, 2024', donation_title: 'Cereal', donation_image_url: 'https://www.cheerios.com/_next/image?url=https%3A%2F%2Fprodcontent.cheerios.com%2Fwp-content%2Fuploads%2F2023%2F12%2FCheerios-Original-Cereal-460x460-1.png&w=1024&q=75', donation_description: 'Cheerios boxed cereal', donation_donor: 'Jewel Osco', donation_pickup_address: '123 Jewel Street, Grayslake, IL, 50043', donation_quantity: 2 },
    { order_number: 12345, order_created_at: 'April 27, 2024', donation_title: 'Bread', donation_image_url: 'https://waterbutlers.com/cdn/shop/products/bread1_f60dedf3-6817-45c3-bdf0-accc3fb0ded6_600x.jpg?v=1606190246', donation_description: 'Wonderbread Loaf', donation_donor: 'Fresh Thyme', donation_pickup_address: '123 Jewel Street, Grayslake, IL, 50043', donation_quantity: 3 },
    { order_number: 12345, order_created_at: 'April 27, 2024', donation_title: 'Pinneaple', donation_image_url: 'https://target.scene7.com/is/image/Target/GUEST_a99d0f27-a426-4276-bfbf-bbcda275c9cb?wid=488&hei=488&fmt=pjpeg', donation_description: 'Canned pinneaple slices', donation_donor: 'Piggly Wiggly', donation_pickup_address: '123 Jewel Street, Grayslake, IL, 50043', donation_quantity: 4 },
];

  return (
      <Container my="md">
        <h1>Order Details</h1>
        <OrderSummaryComponent isCartPage={false} />
        <OrderDetailsComponent ordered_donations={ordered_donations} />
      </Container>
  );
}
