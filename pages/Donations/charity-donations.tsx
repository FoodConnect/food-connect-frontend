import { Container, Grid, Skeleton } from '@mantine/core';
import DonationsTable from '@/components/DonationsTable/DonationsTable';

const child = <Skeleton height={140} radius="md" animate={false} />;
const CharityDonations = () => (
  <Container my="md">
    <Grid>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <DonationsTable />
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
export default CharityDonations;
