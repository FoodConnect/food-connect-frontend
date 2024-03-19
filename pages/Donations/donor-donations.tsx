import { Container, Grid, Skeleton, Title } from '@mantine/core';
import DonationsTable from '@/components/DonationsTable/DonationsTable';
import DonationForm from '@/components/DonationForm/DonationForm';

interface DonationsTableProps {
  dummyUser: { id: number; role: string };
}

const child = <Skeleton height={140} radius="md" animate={false} />;
const DonorDonations = (props: DonationsTableProps) => (
  // async function onSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const response = await fetch('http:localhost:8080/donations', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: formData,
  //   });
  //   if (!response.ok) {
  //     throw new Error('Failed to create data');
  //   }

  //   // Handle response if necessary
  //   // const data = await response.json();
  //   return response.json();
  // }
  <Container my="md">
    <Grid>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <Title order={2}>My Donations</Title>
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <DonationsTable dummyUser={props.dummyUser} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <Title order={2}>Add Donation</Title>
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
