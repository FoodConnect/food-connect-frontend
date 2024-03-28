import { Box, Grid, Skeleton } from '@mantine/core';

export default function DonationInfoLoading() {
  return (
    <Box p={30} mr={40}>
      <Grid>
        <Grid.Col mt={10} span={{ base: 12, xs: 3 }}>
          <Skeleton height={40} m={10} radius="xl" />
          <Skeleton height={40} m={10} radius="xl" />
          <Skeleton height={40} m={10} radius="xl" />
          <Skeleton height={40} m={10} radius="xl" />
          <Skeleton height={40} m={10} radius="xl" />
          <Skeleton height={40} m={10} radius="xl" />
          <Skeleton height={40} m={10} radius="xl" />
          <Skeleton height={40} m={10} radius="xl" />
          <Skeleton height={40} m={10} radius="xl" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <Skeleton height={300} m={20} radius="xl" />
          <Skeleton height={40} m={10} radius="xl" />
          <Skeleton height={40} m={10} radius="xl" />
          <Skeleton height={40} m={10} radius="xl" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 5 }}>
          <Skeleton height={400} m={20} radius="xl" />
          <Skeleton height={40} m={10} radius="xl" />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
