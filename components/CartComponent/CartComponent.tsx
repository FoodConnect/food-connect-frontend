import { NumberInput, Skeleton, Container, Image, Card } from '@mantine/core';

//grid componenet
const child = <Skeleton height={140} radius="md" animate={false} />;

interface Item {
  id: number,
  donation_title: string,
  image_url: string,
  description: string,
  donor: string,
  quantity: number
 }

interface ItemProps {
 items:Item[]
}

export default function CartComponent(props: ItemProps) {
  return (
    <Container my="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {props?.items.map((item) => (
          <Card key={item.id} shadow="xs" padding="md" withBorder style={{ width: '100%' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '200px', flexShrink: 0 }}>
                <Image src={item.image_url} alt="Donation Image" fit="contain" width="200px" height="220px" />
              </div>
              <div style={{ flex: 1, paddingLeft: '20px' }}>
                <h3>{item.description}</h3>
                <p>{item.donor}</p>
                <h4>Quantity</h4>
                <div style={{ width: '200px' }}>
                  <NumberInput radius="sm" defaultValue={1} />
                </div>
                <p>Delete Donation</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
