// donor-donations.tsx
import { Container, Grid, Skeleton, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import DonationsTable from '@/components/DonationsTable/DonationsTable';
import DonationForm from '@/components/DonationForm/DonationForm';
import { DonationFormValues } from '@/components/Interfaces/DonationFormValues';
import {
  DonationFormProvider,
  useDonationForm,
} from '@/components/DonationForm/DonationFormContext';
import { DonationFormDefaultValues } from '@/components/DonationForm/DonationFormDefaultValues';

interface DonationsTableProps {
  dummyUser: { id: number; role: string };
}

const child = <Skeleton height={140} radius="md" animate={false} />;
const DonorDonations = (props: DonationsTableProps) => {
  // Form Instantiation and Submission Method for CREATE Action
  const form = useDonationForm({
    name: 'donation-CREATE-Form',
    initialValues: DonationFormDefaultValues,
    validate: {
      title: (value) => (value !== '' ? null : 'Please enter a title'),
      image_data: (value) => (value !== '' ? null : 'Please enter an image URL'),
      description: (value) => (value !== '' ? null : 'Please enter a description'),
      total_inventory: (value) => (value ? null : 'Please enter a quantity'),
      pick_up_deadline: (value) => (value ? null : 'Please enter a Pick-Up Deadline'),
    },
  });
  // Form Submission Method
  const handleFormSubmit = async (values: DonationFormValues) => {
    await fetch('http://localhost:8080/donations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          showNotification({
            title: 'Error Submitting',
            color: 'red',
            message: 'Sorry, there was an error submitting your request.',
          });
          return response.json();
        }
        form.setValues(DonationFormDefaultValues);
        showNotification({
          title: 'Success Submitting',
          color: 'green',
          message: 'Your request has been successfully submitted.',
        });
        return response.json();
      })
      .catch((error) => {
        if (error !== null) {
          console.log(error);
        }
      });
  };

  return (
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
          <DonationFormProvider form={form}>
            <DonationForm handleFormSubmit={handleFormSubmit} />
          </DonationFormProvider>
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
};
export default DonorDonations;
