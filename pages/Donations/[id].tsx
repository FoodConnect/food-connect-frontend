import {
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
import GradientHeaderImage from '@/components/GradientHeaderImage/GradientHeaderImage';
import DateFormat from '@/components/DateFormat';
import StatsSegments from '@/components/StatsSegments/StatsSegments';
import DonationForm from '@/components/DonationForm/DonationForm';
import { DonationData } from '@/components/Interfaces/DonationData';

interface DonationProps {
  dummyUser: { id: number; role: string };
}

const child = <Skeleton height={140} radius="md" animate={false} color="navy" />;
const Donation = (props: DonationProps) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [donation, setDonation] = useState<DonationData>();
  const router = useRouter();
  const { id }: any = router.query;

  // API Call and useEffect Functions to hydrate table
  async function getData() {
    const res = await fetch(`http://localhost:8080/donations/${id}/`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  useEffect(() => {
    setDomLoaded(true);
    if (!id) return;
    const fetchData = async () => {
      const data = await getData();
      setDonation(data);
    };
    // eslint-disable-next-line no-console
    fetchData().catch(console.error);
  }, [id]);

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
          <DonationForm dummyUser={props.dummyUser} />
        </Container>
      )}
    </>
  );
};
export default Donation;
