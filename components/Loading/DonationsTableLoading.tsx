import { Box, Grid, Skeleton } from '@mantine/core';

const child = <Skeleton height={8} radius="xl" />;

export default function DonationsInfoLoading() {
  return (
    <Box p={30}>
      <Grid>
        <Grid.Col my={10} span={{ base: 12, xs: 12 }}>
          {child}
        </Grid.Col>
        <Grid.Col my={10} span={{ base: 12, xs: 12 }}>
          {child}
        </Grid.Col>
        <Grid.Col my={10} span={{ base: 12, xs: 12 }}>
          {child}
        </Grid.Col>
        <Grid.Col my={10} span={{ base: 12, xs: 12 }}>
          {child}
        </Grid.Col>
        <Grid.Col my={10} span={{ base: 12, xs: 12 }}>
          {child}
        </Grid.Col>
        <Grid.Col my={10} span={{ base: 12, xs: 12 }}>
          {child}
        </Grid.Col>
        <Grid.Col my={10} span={{ base: 12, xs: 12 }}>
          {child}
        </Grid.Col>
        <Grid.Col my={10} span={{ base: 12, xs: 12 }}>
          {child}
        </Grid.Col>
        <Grid.Col my={10} span={{ base: 12, xs: 12 }}>
          {child}
        </Grid.Col>
        <Grid.Col my={10} span={{ base: 12, xs: 12 }}>
          {child}
        </Grid.Col>
      </Grid>
    </Box>
  );
}
