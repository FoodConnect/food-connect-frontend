import { Table, Progress, Anchor, Text, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import classes from './DonationsTable.module.css';
import DateFormat from '../DateFormat';

// Dummy Data for feaux authorization
// TO BE Removed upon call connection to Django API
const data = [
  {
    id: 1,
    description: 'Apples',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-03-09T09:47:00Z',
    inventory: { claimed: 90, remaining: 10 },
  },
  {
    id: 2,
    description: 'Bananas',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-03-25T09:47:00Z',
    inventory: { claimed: 350, remaining: 756 },
  },
  {
    id: 3,
    description: 'Oranges',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-04-15T09:47:00Z',
    inventory: { claimed: 2345, remaining: 812 },
  },
  {
    id: 4,
    description: 'Pears',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-04-29T09:47:00Z',
    inventory: { claimed: 0, remaining: 570 },
  },
  {
    id: 5,
    description: 'Chickens',
    donor: { name: 'Test User Business', user: { id: 1 } },
    pick_up_deadline: '2024-04-29T09:47:00Z',
    inventory: { claimed: 215, remaining: 1587 },
  },
  {
    id: 6,
    description: 'Boxes of Crackers',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-05-12T09:47:00Z',
    inventory: { claimed: 1121, remaining: 397 },
  },
  {
    id: 7,
    description: 'Eggs',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-03-20T09:47:00Z',
    inventory: { claimed: 284, remaining: 1668 },
  },
  {
    id: 8,
    description: 'Potatoes',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-06-01T09:47:00Z',
    inventory: { claimed: 744, remaining: 128 },
  },
  {
    id: 9,
    description: 'Maple Syrup Bottles',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-06-01T09:47:00Z',
    inventory: { claimed: 51, remaining: 76 },
  },
  {
    id: 10,
    description: 'Carrots',
    donor: { name: 'Marges Restaurant', user: { id: 2 } },
    pick_up_deadline: '2024-03-05T09:47:00Z',
    inventory: { claimed: 46, remaining: 10 },
  },
];

interface DonationsTableProps {
  dummyUser: { id: number; role: string };
}

const DonationsTable = (props: DonationsTableProps) => {
  const path = useRouter()?.asPath;
  let arr = [];

  // Condition for Donor Donation Page filtered donation list
  if (path === '/donor-donations') {
    arr = data.filter((row) => row.donor.user.id === props.dummyUser.id);
  } else {
    arr = data;
  }

  const rows = arr.map((row) => {
    const totalInventory = row.inventory.remaining + row.inventory.claimed;
    const remainingInventory = (row.inventory.remaining / totalInventory) * 100;
    const claimedInventory = (row.inventory.claimed / totalInventory) * 100;

    return (
      <Table.Tr key={row.id}>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {row.description}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <DateFormat dateString={row.pick_up_deadline} />
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {row.donor.name}
          </Anchor>
        </Table.Td>
        <Table.Td>{Intl.NumberFormat().format(totalInventory)}</Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="xs" c="teal" fw={700}>
              {claimedInventory.toFixed(0)}%
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={claimedInventory}
              color="shrek"
            />

            <Progress.Section
              className={classes.progressSection}
              value={remainingInventory}
              color="teal"
            />
          </Progress.Root>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Description</Table.Th>
            <Table.Th>Deadline</Table.Th>
            <Table.Th>Author</Table.Th>
            <Table.Th>Total Donated</Table.Th>
            <Table.Th>Inventory Claimed</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
export default DonationsTable;
