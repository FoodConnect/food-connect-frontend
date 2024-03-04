import { Container, Grid, Skeleton } from '@mantine/core';
import { FC } from 'react';
import DonationsTable from '@/components/DonationsTable/DonationsTable';
import DonationForm from '@/components/DonationForm/DonationForm';

interface DonationsTableProps {
  dummyUser: { id: number; role: string };
}

const child = <Skeleton height={140} radius="md" animate={false} />;
const DonorDonations: FC<DonationsTableProps> = (props) => (
  <Container my="md">
    <Grid>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <DonationsTable dummyUser={props.dummyUser} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <DonationForm />
      </Grid.Col>

      <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
    </Grid>
  </Container>
);
export default DonorDonations;
