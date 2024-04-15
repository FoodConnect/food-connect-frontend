import { Container, Grid, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DonationsTable from '@/components/DonationsTable/DonationsTable';
import DonationForm from '@/components/DonationForm/DonationForm';
import {
  DonationFormProvider,
  useDonationForm,
} from '@/components/DonationForm/DonationFormContext';
import { DonationFormValues } from '@/components/Interfaces/DonationFormValues';
import { DonationFormDefaultValues } from '@/components/DonationForm/DonationFormDefaultValues';
import { child } from './donor-donations';

export const DonorDonations = () => {
  const { data: session } = useSession();
  const [response, setResponse] = useState('{}');
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
      donor: session?.user.pk!,
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
  };

  useEffect(() => {
    const fetchData = async () => {
      if (session !== null) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${session?.user.pk}`
          );
          setResponse(JSON.stringify(res.data));
          console.log(res.data);
        } catch (error) {
          if (error instanceof Error) {
            setResponse(error.message);
          }
        }
      }
    };
    fetchData();
  }, [session]);

  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={{ base: 12, xs: 12 }}>{response}</Grid.Col>
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
