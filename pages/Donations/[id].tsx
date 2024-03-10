import { Container, Grid, Image, Skeleton } from '@mantine/core';
import { useRouter } from 'next/router';
// import { FC } from 'react';
// import DonationsTable from '@/components/DonationsTable/DonationsTable';

// Dummy Data for feaux authorization
// TO BE Removed upon call connection to Django API
const data = [
  {
    id: 1,
    title: 'Apples',
    description: 'Apples',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-03-09T09:47:00Z',
    inventory: { claimed: 90, remaining: 10 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
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
  },
  {
    id: 5,
    title: 'Chickens',
    description: 'Chickens',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-04-29T09:47:00Z',
    inventory: { claimed: 215, remaining: 1587 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
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
  },
  {
    id: 7,
    title: 'Eggs',
    description: 'Eggs',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-03-20T09:47:00Z',
    inventory: { claimed: 284, remaining: 1668 },
    is_available: true,
    image_data:
      'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
    created_at: '2024-03-01T09:47:00Z',
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
      a
      <Grid>
        <Grid.Col span={{ base: 12, xs: 4 }}>DONATION ID: {id}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>DONATION TITLE: {donation?.title}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>DONATION DESRIPTION: {donation?.description}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          DONATION INVENTORY: CLAIMED-{parseInt(donation?.inventory.claimed, 10)} REMAINING-
          {parseInt(donation?.inventory.remaining, 10)}
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>DONATION DEADLINE: {donation?.deadline}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          DONATION IS_AVAILABLE: {donation?.is_available}
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>CREATED_AT: {donation?.created_at}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <Image src={donation?.image_data} radius="md" h={200} />
        </Grid.Col>
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
