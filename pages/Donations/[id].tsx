import {
  Button,
  Card,
  Container,
  Drawer,
  Flex,
  Grid,
  Group,
  Image,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
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
import DonationInfoLoading from '@/components/Loading/DonationInfoLoading';

const Donation = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [donation, setDonation] = useState<DonationData>();
  const router = useRouter();
  const { id }: any = router.query;
  const { data: session } = useSession();

  // Update Donation Drawer Variables
  const [opened, { open, close }] = useDisclosure(false);
  const { width } = useViewportSize();
  const setPosition = () => {
    if (width > 720) {
      return 'bottom';
    }
    return 'right';
  };

  // Form Instantiation and Submission Method for UPDATE Action
  const form = useDonationForm({
    name: 'donation-UPDATE-Form',
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
      is_available: donation?.is_available!,
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
  // Form submission method
  const handleSubmit = async (values: DonationFormValues) => {
    await fetch(`http://localhost:8080/donations/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          showNotification({
            title: 'Error Updating',
            color: 'red',
            message: 'Sorry, there was an error submitting your update.',
          });
          return response.json();
        }
        // form.setValues(formResetValues);
        showNotification({
          title: 'Update Successful',
          color: 'green',
          message: 'Your update has been successfully submitted.',
        });
        close();
        setDonation(values);
        return response.json();
      })
      .catch((error) => {
        if (error !== null) {
          null;
        }
      });
  };

  // *REMOVE* DELAY FUNCTION for Development Presentation of Loading State
  function timeout(delay: number) {
    return new Promise((res) => {
      setTimeout(res, delay);
    });
  }
  // API Request and useEffect Functions to populate donation profile
  async function getData() {
    const response = await fetch(`http://localhost:8080/donations/${id}/`);
    await timeout(1000);
    setLoading(false);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }

  useEffect(() => {
    if (!id) return;
    setDomLoaded(true);
    const fetchData = async () => {
      const data = await getData();
      setDonation(data);
      if (data) {
        form.initialize(data);
      }
    };
    // eslint-disable-next-line no-console
    fetchData().catch(console.error);
  }, [id]);

  // *REMOVE* Delete Feaux Authorization Check (To be ammended upon official Auth setup)
  const isAuthorized = () => donation?.donor === session?.user.pk;

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
      title: 'Cancelled',
      color: 'teal',
      message: 'Delete Donation was cancelled.',
    });
  }
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete Donation',
      centered: true,
      overlayProps: { backgroundOpacity: 0.3, blur: 2 },
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
                {loading ? (
                  <DonationInfoLoading />
                ) : (
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
                          <Text c="dimmed">{donation?.is_available === true ? 'Yes' : 'No'}</Text>
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
                )}
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12 }}>
              <Card h={140} radius="md" bg="teal.2" />
            </Grid.Col>
          </Grid>
          {isAuthorized() ? (
            <>
              <Drawer
                offset={8}
                radius="md"
                position={setPosition()}
                size="lg"
                opened={opened}
                onClose={close}
                title="Update Donation"
                overlayProps={{ backgroundOpacity: 0.3, blur: 2 }}
              >
                <DonationFormProvider form={form}>
                  <form onSubmit={form.onSubmit(handleSubmit)}>
                    <DonationForm />
                  </form>
                </DonationFormProvider>
              </Drawer>
              <Grid>
                <Grid.Col span={{ base: 12, xs: 12 }}>
                  <Group>
                    <Button onClick={open} color="teal" rightSection={<IconEdit />}>
                      Update Donation
                    </Button>
                    <Button onClick={openDeleteModal} color="red" rightSection={<IconTrash />}>
                      Delete Donation
                    </Button>
                  </Group>
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
