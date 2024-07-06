// donor-donations.tsx
import { Container, Grid, Skeleton, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import DonationsTable from '@/components/DonationsTable/DonationsTable';
import DonationForm from '@/components/DonationForm/DonationForm';
import {
  DonationFormProvider,
  useDonationForm,
} from '@/components/DonationForm/DonationFormContext';
import { DonationFormValues } from '@/components/Interfaces/DonationFormValues';
import { DonationFormDefaultValues } from '@/components/DonationForm/DonationFormDefaultValues';

const child = <Skeleton height={140} radius="md" animate={false} />;

const DonorDonations = () => {
  const { data: session } = useSession();
  const donorId = session?.user.pk;
  // Form Instantiation and Submission Method for CREATE Action
  const form = useDonationForm({
    initialValues: {
      title: '',
      image_data: '',
      description: '',
      total_inventory: 0,
      claimed_inventory: 0,
      remaining_inventory: 0,
      pick_up_deadline: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      is_available: true,
      donor_id: donorId!,
      category: 'produce',
    },
    validate: {
      title: (value) =>
        value === '' || value.length > 30
          ? 'Please enter a title and ensure that its length does not exceed 30 characters.'
          : null,
      image_data: (value) =>
        value.length > 255 ? 'Image URL may not excede 255 characters' : null,
    },
  });
  // Form Submission Method
  const handleSubmit = async (values: DonationFormValues) => {
    if (session) {
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
              message:
                'Sorry, there was an error submitting your request. Be sure to select a date before submmitting.',
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
            null;
          }
        });
    } else {
      showNotification({
        title: 'Error Submitting',
        color: 'red',
        message: 'Sorry, there was an error submitting your request. Please Sign In to proceed.',
      });
    }
  };

  useEffect(() => {}, [session]);

  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={{ base: 12, xs: 12 }}>
          <Title order={2}>My Donations</Title>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12 }}>
          <DonationsTable />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12 }}>
          <Title order={2}>Add Donation</Title>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12 }}>
          <DonationFormProvider form={form}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <input name="donor" type="hidden" defaultValue={donorId} />
              <DonationForm />
            </form>
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
