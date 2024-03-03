import { Container, Grid, Skeleton } from '@mantine/core';
import { FC } from 'react';
import DonationsTable from '@/components/DonationsTable/DonationsTable';
import DonationForm from '@/components/DonationForm/DonationForm';

const dummyUser = { id: 1, role: 'donor' };

const child = <Skeleton height={140} radius="md" animate={false} />;
const DonorDonations: FC = () => (
  <Container my="md">
    <Grid>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <DonationsTable dummyUser={dummyUser} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <DonationForm />
        {child}
      </Grid.Col>

      <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
    </Grid>
  </Container>
);
export default DonorDonations;
