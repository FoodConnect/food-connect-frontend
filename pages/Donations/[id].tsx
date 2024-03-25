import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Image,
  ScrollArea,
  Skeleton,
  Text,
  Title,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { IconCircleArrowUpRight } from '@tabler/icons-react';
import GradientHeaderImage from '@/components/GradientHeaderImage/GradientHeaderImage';
import DateFormat from '@/components/DateFormat';
import StatsSegments from '@/components/StatsSegments/StatsSegments';
import DonationForm from '@/components/DonationForm/DonationForm';
import { DonationData } from '@/components/Interfaces/DonationData';
import { DonationFormValues } from '@/components/Interfaces/DonationFormValues';
import {
  DonationFormProvider,
  useDonationForm,
} from '@/components/DonationForm/DonationFormContext';
import { DonationFormDefaultValues } from '@/components/DonationForm/DonationFormDefaultValues';

interface DonationProps {
  dummyUser: { id: number; role: string };
}

const child = <Skeleton height={140} radius="md" animate={false} color="navy" />;
const Donation = (props: DonationProps) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [donation, setDonation] = useState<DonationData>();
  const router = useRouter();
  const { id }: any = router.query;

  // Form Instantiation and Submission Method for UPDATE Action
  // const form = useDonationForm({
  //   name: 'donation-UPDATE-Form',
  //   initialValues: DonationFormDefaultValues,
  //   validate: {
  //     title: (value) => (value !== '' ? null : 'Please enter a title'),
  //     image_data: (value) => (value !== '' ? null : 'Please enter an image URL'),
  //     description: (value) => (value !== '' ? null : 'Please enter a description'),
  //     total_inventory: (value) => (value ? null : 'Please enter a quantity'),
  //     pick_up_deadline: (value) => (value ? null : 'Please enter a Pick-Up Deadline'),
  //   },
  // });
  // Form submission method
  // const handleFormSubmit = async (values: DonationFormValues) => {
  //   await fetch(`http://localhost:8080/donations/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(values),
  //   })
  //     .then((response) => {
  //       if (response.status >= 400 && response.status < 600) {
  //         showNotification({
  //           title: 'Error Updating',
  //           color: 'red',
  //           message: 'Sorry, there was an error submitting your update.',
  //         });
  //         return response.json();
  //       }
  //       // form.setValues(formResetValues);
  //       showNotification({
  //         title: 'Update Successful',
  //         color: 'green',
  //         message: 'Your update has been successfully submitted.',
  //       });
  //       return response.json();
  //     })
  //     .catch((error) => {
  //       if (error !== null) {
  //         console.log(error);
  //       }
  //     });
  // };

  // API Request and useEffect Functions to populate donation profile
  async function getData() {
    const response = await fetch(`http://localhost:8080/donations/${id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }

  useEffect(() => {
    setDomLoaded(true);
    if (!id) return;
    const fetchData = async () => {
      const data = await getData();
      setDonation(data);
      // if (data) {
      //   form.initialize(data);
      // }
    };
    // eslint-disable-next-line no-console
    fetchData().catch(console.error);
  }, [id]);

  // Delete Feaux Authorization Check (To be ammended upon official Auth setup)
  const isAuthorized = () => donation?.donor === props.dummyUser.id;

  // API Request to Delete Donation
  async function handleDeleteDonation() {
    const response = await fetch(`http://localhost:8080/donations/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      showNotification({
        title: 'Error Deleting',
        color: 'red',
        message: 'Sorry, there was an error deleting this donation.',
      });
      return response.json();
    }
    showNotification({
      title: 'Deleted',
      color: 'green',
      message: 'Your donation has been successfully deleted.',
    });
    router.push('/Donations/donor-donations');
    return null;
  }

  // Delete Confirm and Cancel Modal Functions
  function cancelDeleteDonation() {
    showNotification({
      title: 'Cancel',
      color: 'teal',
      message: 'Delete Donation was cancelled.',
    });
  }
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete Donation',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this donation? This action is destructive and you will not
          be able to retreive it again.
        </Text>
      ),
      labels: { confirm: 'Delete Donation', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => cancelDeleteDonation(),
      onConfirm: () => handleDeleteDonation(),
    });
  return (
    <>
      {' '}
      {domLoaded && (
        <Container my="md">
          <Grid>
            <Grid.Col span={{ base: 12, xs: 12 }}>
              <GradientHeaderImage category="produce" />
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
                    <Flex my="lg" direction="column" gap={0}>
                      <Title order={5}>{donation?.title}</Title>
                      <ScrollArea h={200} scrollbarSize={7} c="dimmed">
                        {donation?.description}
                      </ScrollArea>
                    </Flex>
                    <Flex my="lg" direction="column" gap={0}>
                      <Title order={5}>Donation Available</Title>
                      <Text c="dimmed">
                        <Text c="dimmed">{donation?.is_available ? 'Yes' : 'No'}</Text>
                      </Text>
                    </Flex>
                    <Flex my="lg" direction="column" gap={0}>
                      <Title order={5}>Donated On</Title>
                      <Text c="dimmed">
                        <DateFormat dateString={donation?.created_at!} />
                      </Text>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 4 }}>
                    <StatsSegments
                      claimed={donation?.claimed_inventory}
                      remaining={donation?.remaining_inventory}
                    />
                    <Flex my="lg" direction="column" gap={0}>
                      <Title order={5}>Donation Pickup Deadline</Title>
                      <Text c="dimmed">
                        <DateFormat dateString={donation?.pick_up_deadline!} />
                      </Text>
                    </Flex>
                    <Flex my="lg" direction="column" gap={0}>
                      <Title order={5}>Category</Title>
                      <Text c="dimmed">
                        <Text c="dimmed">Produce</Text>
                      </Text>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, xs: 5 }}>
                    <Image height="500rem" src={donation?.image_data} radius="md" />
                  </Grid.Col>
                </Grid>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12 }}>{child}</Grid.Col>
          </Grid>
          {isAuthorized() ? (
            <>
              {/* <DonationFormProvider form={form}>
                <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
                  <DonationForm />
                  <Button
                    type="submit"
                    justify="center"
                    m="lg"
                    variant="filled"
                    color="navy"
                    rightSection={<IconCircleArrowUpRight />}
                  >
                    Submit
                  </Button>
                </form>
              </DonationFormProvider> */}
              <Grid>
                <Grid.Col span={{ base: 12, xs: 4 }}>
                  <Button onClick={openDeleteModal} color="red">
                    Delete Donation
                  </Button>
                </Grid.Col>
              </Grid>
            </>
          ) : null}
        </Container>
      )}
    </>
  );
};
export default Donation;
