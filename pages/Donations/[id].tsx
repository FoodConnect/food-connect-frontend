import { Card, Container, Grid, Image, Skeleton, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import GradientHeaderImage from '@/components/Inputs/GradientHeaderImage/GradientHeaderImage';
// import { FC } from 'react';
// import DonationsTable from '@/components/DonationsTable/DonationsTable';

// Dummy Data for feaux authorization
// TO BE Removed upon call connection to Django API
const data = [
  {
    id: 1,
    title: 'Apples',
    description:
      'Locally sourced apples, freshly picked, are readied for donation. Soon to reach food banks and shelters, they offer nourishment and comfort, symbolizing the spirit of community care and support.',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-03-09T09:47:00Z',
    inventory: { claimed: 90, remaining: 10 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
    category: 'Produce',
  },
  {
    id: 2,
    title: 'Bananas',
    description: 'Bananas',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-03-25T09:47:00Z',
    inventory: { claimed: 350, remaining: 756 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
    category: 'Produce',
  },
  {
    id: 3,
    title: 'Oranges',
    description: 'Oranges',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-04-15T09:47:00Z',
    inventory: { claimed: 2345, remaining: 812 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
    category: 'Produce',
  },
  {
    id: 4,
    title: 'Pears',
    description: 'Pears',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-04-29T09:47:00Z',
    inventory: { claimed: 0, remaining: 570 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
    category: 'Produce',
  },
  {
    id: 5,
    title: 'Canned Chickens',
    description: 'Canned Chickens',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-04-29T09:47:00Z',
    inventory: { claimed: 215, remaining: 1587 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
    category: 'Canned',
  },
  {
    id: 6,
    title: 'Boxes of Crackers',
    description: 'Boxes of Crackers',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-05-12T09:47:00Z',
    inventory: { claimed: 1121, remaining: 397 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
    category: 'Dry',
  },
  {
    id: 7,
    title: 'Eggs',
    description:
      'Local farms donate fresh eggs, packed with care. Destined for food banks and shelters, these eggs offer comfort and sustenance to those in need, symbolizing the power of kindness in our community.',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-03-20T09:47:00Z',
    inventory: { claimed: 284, remaining: 1668 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
    category: 'Produce',
  },
  {
    id: 8,
    title: 'Potatoes',
    description: 'Potatoes',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-06-01T09:47:00Z',
    inventory: { claimed: 744, remaining: 128 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
    category: 'Produce',
  },
  {
    id: 9,
    title: 'Maple Syrup Bottles',
    description: 'Maple Syrup Bottles',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-06-01T09:47:00Z',
    inventory: { claimed: 51, remaining: 76 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
    category: 'Canned',
  },
  {
    id: 10,
    title: 'Carrots',
    description: 'Carrots',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-03-05T09:47:00Z',
    inventory: { claimed: 46, remaining: 10 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
    category: 'Produce',
  },
  {
    id: 11,
    title: 'Salt Packets',
    description: 'Salt Packets',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-03-05T09:47:00Z',
    inventory: { claimed: 100, remaining: 3568 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
    category: 'Dry',
  },
  {
    id: 12,
    title: 'Cartons of Milk',
    description: 'Cartons of Milk',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-03-05T09:47:00Z',
    inventory: { claimed: 365, remaining: 789 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
    category: 'Dairy',
  },
];

// // INTERFACE FOR PROPS...
// interface DonationProps {
//   id: number;
// }

const child = <Skeleton height={140} radius="md" animate={false} />;
// WITHOUT PROPS
const CharityDonations = () => {
  const router = useRouter();
  const { id }: any = router.query;
  // // TO BE Removed: Extract item from Static Data
  const donation: any = data.filter((row) => row.id === parseInt(id, 10))[0];

  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={{ base: 12, xs: 12 }}>
          <GradientHeaderImage />
          {/* <GradientHeaderImage category={donation?.category} /> */}
          <Card
            style={{ zIndex: 2 }}
            pos="relative"
            mt={-80}
            ml={{ base: 0, lg: 50, md: 24, sm: 24, xs: 0 }}
            mr={{ base: 0, lg: 50, md: 24, sm: 24, xs: 0 }}
            p={{ base: 0, lg: 2, md: 0, sm: 0, xs: 0 }}
            // px={{ base: 0, lg: 2, md: 0, sm: 0, xs: 0 }}
            shadow="sm"
            radius="md"
            withBorder={false}
          >
            <Grid p={{ base: 0, lg: 25, md: 25, sm: 15, xs: 10 }}>
              <Grid.Col span={{ base: 12, xs: 12 }}>
                <Title order={2}>Donation Details</Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 3 }}>
                <Title order={5}>{donation?.title}</Title>
                <Text c="dimmed">{donation?.description}</Text>
                CLAIMED-{parseInt(donation?.inventory.claimed, 10)} REMAINING-
                {parseInt(donation?.inventory.remaining, 10)}
                <Grid.Col span={{ base: 12, xs: 12 }}>{child}</Grid.Col>
                <Grid.Col span={{ base: 12, xs: 4 }}>CREATED_AT: {donation?.created_at}</Grid.Col>
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 4 }}>
                DONATION DEADLINE: {donation?.deadline}
                <Grid.Col span={{ base: 12, xs: 12 }}>{child}</Grid.Col>
                DONATION IS_AVAILABLE: {donation?.is_available ? 'YES' : 'NO'}
                <Grid.Col span={{ base: 12, xs: 12 }}>{child}</Grid.Col>
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 5 }}>
                <Image height="500rem" src={donation?.image_data} radius="md" />
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12 }}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
};
// // WITH PROPS...
// const CharityDonations: FC<DonationProps> = () => (
//   <Container my="md">
//     <Grid>
//       <Grid.Col span={{ base: 12, xs: 4 }}>DONATION ID: {id}</Grid.Col>
//       <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>

//       <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
//       <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
//       <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
//       <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
//       <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
//     </Grid>
//   </Container>
// );
export default CharityDonations;
