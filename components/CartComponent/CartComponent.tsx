import { Grid, NumberInput, Skeleton, Container, Title, Image, Flex, Divider } from '@mantine/core';

//grid componenet
const child = <Skeleton height={140} radius="md" animate={false} />;

export default function CartComponent({ props }) {
  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>

        <Grid.Col span={{ base: 12, xs: 12 }}><Title> Your Cart </Title></Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>
          <h1>Practice Data</h1>
          {props.items.map((item) => (
            <div key={item.id}>
              <p>Name: {item.name} </p>
            </div>
          ))}
          <h2>
          Donation Title
          </h2>
          <Flex>
          <Image src="/logo.svg" alt="Food Connect Logo" width={100} height={120} />
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 8 }}>
          <h2>Donation Description</h2>
          <h4>Quantity</h4>
          <NumberInput />
          <p>Delete Donation</p>
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 12 }}><Divider my="md" /></Grid.Col>
      </Grid>
    </Container>
  );
}
