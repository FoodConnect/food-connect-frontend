import { Container, Grid, Skeleton } from '@mantine/core';
import { useRouter } from 'next/router';
// import { FC } from 'react';
// import DonationsTable from '@/components/DonationsTable/DonationsTable';

// Dummy Data for feaux authorization
// TO BE Removed upon call connection to Django API
const data = [
  {
    id: 1,
    description: 'Apples',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-03-09T09:47:00Z',
    inventory: { claimed: 90, remaining: 10 },
  },
  {
    id: 2,
    description: 'Bananas',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-03-25T09:47:00Z',
    inventory: { claimed: 350, remaining: 756 },
  },
  {
    id: 3,
    description: 'Oranges',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-04-15T09:47:00Z',
    inventory: { claimed: 2345, remaining: 812 },
  },
  {
    id: 4,
    description: 'Pears',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-04-29T09:47:00Z',
    inventory: { claimed: 0, remaining: 570 },
  },
  {
    id: 5,
    description: 'Chickens',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-04-29T09:47:00Z',
    inventory: { claimed: 215, remaining: 1587 },
  },
  {
    id: 6,
    description: 'Boxes of Crackers',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-05-12T09:47:00Z',
    inventory: { claimed: 1121, remaining: 397 },
  },
  {
    id: 7,
    description: 'Eggs',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-03-20T09:47:00Z',
    inventory: { claimed: 284, remaining: 1668 },
  },
  {
    id: 8,
    description: 'Potatoes',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-06-01T09:47:00Z',
    inventory: { claimed: 744, remaining: 128 },
  },
  {
    id: 9,
    description: 'Maple Syrup Bottles',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-06-01T09:47:00Z',
    inventory: { claimed: 51, remaining: 76 },
  },
  {
    id: 10,
    description: 'Carrots',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-03-05T09:47:00Z',
    inventory: { claimed: 46, remaining: 10 },
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
  const { id } = router.query;
  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={{ base: 12, xs: 4 }}>DONATION ID: {id}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>

        <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
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
