import { Table, Progress, Anchor, Text, Group } from '@mantine/core';
import classes from './DonationsTable.module.css';
import DateFormat from '../DateFormat';

const data = [
  {
    description: 'A bunch of apples',
    donor: 'Test User Business',
    pick_up_deadline: '2024-03-09T09:47:00Z',

    inventory: { claimed: 90, remaining: 10 },
  },
];

export function DonationsTable() {
  const rows = data.map((row) => {
    const totalInventory = row.inventory.remaining + row.inventory.claimed;
    const remainingInventory = (row.inventory.remaining / totalInventory) * 100;
    const claimedInventory = (row.inventory.claimed / totalInventory) * 100;

    return (
      <Table.Tr key={row.description}>
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
            {row.donor}
          </Anchor>
        </Table.Td>
        <Table.Td>{Intl.NumberFormat().format(totalInventory)}</Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="xs" c="teal" fw={700}>
              {claimedInventory.toFixed(0)}%
            </Text>
            {/* <Text fz="xs" c="red" fw={700}>
              {remainingInventory.toFixed(0)}%
            </Text> */}
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
}
