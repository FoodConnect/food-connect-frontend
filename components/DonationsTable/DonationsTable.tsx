import { Table, Progress, Anchor, Text, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import classes from './DonationsTable.module.css';
import DateFormat from '../DateFormat';

// Dummy Data for feaux authorization
// TO BE Removed upon call connection to Django API
// const data = [
//   {
//     id: 1,
//     title: 'Apples',
//     description:
//       'Locally sourced apples, freshly picked, are readied for donation. Soon to reach food banks and shelters, they offer nourishment and comfort, symbolizing the spirit of community care and support.',
//     donor: { name: 'Test User Business', user: { id: 1 } },
//     pick_up_deadline: '2024-03-09T09:47:00Z',
//     inventory: { claimed: 90, remaining: 10 },
//     is_available: true,
//     image_data:
//       'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
//     created_at: '2024-03-01T09:47:00Z',
//     category: 'Produce',
//   },
//   {
//     id: 2,
//     title: 'Bananas',
//     description: 'Bananas',
//     donor: { name: 'Test User Business', user: { id: 1 } },
//     pick_up_deadline: '2024-03-25T09:47:00Z',
//     inventory: { claimed: 350, remaining: 756 },
//     is_available: true,
//     image_data:
//       'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
//     created_at: '2024-03-01T09:47:00Z',
//     category: 'Produce',
//   },
//   {
//     id: 3,
//     title: 'Oranges',
//     description: 'Oranges',
//     donor: { name: 'Test User Business', user: { id: 1 } },
//     pick_up_deadline: '2024-04-15T09:47:00Z',
//     inventory: { claimed: 2345, remaining: 812 },
//     is_available: true,
//     image_data:
//       'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
//     created_at: '2024-03-01T09:47:00Z',
//     category: 'Produce',
//   },
//   {
//     id: 4,
//     title: 'Pears',
//     description: 'Pears',
//     donor: { name: 'Test User Business', user: { id: 1 } },
//     pick_up_deadline: '2024-04-29T09:47:00Z',
//     inventory: { claimed: 0, remaining: 570 },
//     is_available: true,
//     image_data:
//       'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
//     created_at: '2024-03-01T09:47:00Z',
//     category: 'Produce',
//   },
//   {
//     id: 5,
//     title: 'Canned Chickens',
//     description: 'Canned Chickens',
//     donor: { name: 'Test User Business', user: { id: 1 } },
//     pick_up_deadline: '2024-04-29T09:47:00Z',
//     inventory: { claimed: 215, remaining: 1587 },
//     is_available: true,
//     image_data:
//       'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
//     created_at: '2024-03-01T09:47:00Z',
//     category: 'Canned',
//   },
//   {
//     id: 6,
//     title: 'Boxes of Crackers',
//     description: 'Boxes of Crackers',
//     donor: { name: 'Marges Restaurant', user: { id: 2 } },
//     pick_up_deadline: '2024-05-12T09:47:00Z',
//     inventory: { claimed: 1121, remaining: 397 },
//     is_available: true,
//     image_data:
//       'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
//     created_at: '2024-03-01T09:47:00Z',
//     category: 'Dry',
//   },
//   {
//     id: 7,
//     title: 'Eggs',
//     description:
//       'Local farms donate fresh eggs, packed with care. Destined for food banks and shelters, these eggs offer comfort and sustenance to those in need, symbolizing the power of kindness in our community.',
//     donor: { name: 'Marges Restaurant', user: { id: 2 } },
//     pick_up_deadline: '2024-03-20T09:47:00Z',
//     inventory: { claimed: 284, remaining: 1668 },
//     is_available: true,
//     image_data:
//       'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
//     created_at: '2024-03-01T09:47:00Z',
//     category: 'Produce',
//   },
//   {
//     id: 8,
//     title: 'Potatoes',
//     description: 'Potatoes',
//     donor: { name: 'Marges Restaurant', user: { id: 2 } },
//     pick_up_deadline: '2024-06-01T09:47:00Z',
//     inventory: { claimed: 744, remaining: 128 },
//     is_available: true,
//     image_data:
//       'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
//     created_at: '2024-03-01T09:47:00Z',
//     category: 'Produce',
//   },
//   {
//     id: 9,
//     title: 'Maple Syrup Bottles',
//     description: 'Maple Syrup Bottles',
//     donor: { name: 'Marges Restaurant', user: { id: 2 } },
//     pick_up_deadline: '2024-06-01T09:47:00Z',
//     inventory: { claimed: 51, remaining: 76 },
//     is_available: true,
//     image_data:
//       'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
//     created_at: '2024-03-01T09:47:00Z',
//     category: 'Canned',
//   },
//   {
//     id: 10,
//     title: 'Carrots',
//     description: 'Carrots',
//     donor: { name: 'Marges Restaurant', user: { id: 2 } },
//     pick_up_deadline: '2024-03-05T09:47:00Z',
//     inventory: { claimed: 46, remaining: 10 },
//     is_available: true,
//     image_data:
//       'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
//     created_at: '2024-03-01T09:47:00Z',
//     category: 'Produce',
//   },
//   {
//     id: 11,
//     title: 'Salt Packets',
//     description: 'Salt Packets',
//     donor: { name: 'Marges Restaurant', user: { id: 2 } },
//     pick_up_deadline: '2024-03-05T09:47:00Z',
//     inventory: { claimed: 100, remaining: 3568 },
//     is_available: true,
//     image_data:
//       'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
//     created_at: '2024-03-01T09:47:00Z',
//     category: 'Dry',
//   },
//   {
//     id: 12,
//     title: 'Cartons of Milk',
//     description: 'Cartons of Milk',
//     donor: { name: 'Test User Business', user: { id: 1 } },
//     pick_up_deadline: '2024-03-05T09:47:00Z',
//     inventory: { claimed: 365, remaining: 789 },
//     is_available: true,
//     image_data:
//       'https://thumbs.dreamstime.com/b/fresh-carrots-farmer-s-market-pile-freshly-harvested-carrots-arranged-wooden-crate-sitting-burlap-sack-276909252.jpg',
//     created_at: '2024-03-01T09:47:00Z',
//     category: 'Dairy',
//   },
// ];

interface DonationsTableProps {
  dummyUser: { id: number; role: string };
}

interface TableData {
  claimed_inventory: number;
  remaining_inventory: number;
  total_inventory: number;
  id: Key | null | undefined;
  title:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  pick_up_deadline: string;
  donor: number;
}

const DonationsTable = (props: DonationsTableProps) => {
  const [tableItems, setTableItems] = useState<TableData[]>();
  // Condition for Donor Donation Page filtered donation list
  const path = useRouter().asPath;
  const filterData = (data: TableData[]) => {
    let arr = [];
    console.log(data[0].donor);
    console.log(props.dummyUser.id);

    if (path === '/Donations/donor-donations') {
      arr = data.filter((row) => row.donor === props.dummyUser.id);
    } else {
      arr = data;
    }
    return arr;
  };
  // API Call and useEffect Functions to hydrate table
  async function getData() {
    const res = await fetch('http://localhost:8080/donations/');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

  useEffect(() => {
    const fetchData = async () => {
      let data = await getData();
      data = filterData(data);
      setTableItems(data);
      console.log(data);
    };
    // eslint-disable-next-line no-console
    fetchData().catch(console.error);
  }, []);

  const rows = tableItems?.map((row: TableData) => {
    const totalInventory = row.remaining_inventory + row.claimed_inventory;
    const remainingInventory = (row.remaining_inventory / totalInventory) * 100;
    const claimedInventory = (row.claimed_inventory / totalInventory) * 100;

    return (
      <Table.Tr key={row.id}>
        <Table.Td>
          <Anchor
            component={Link}
            href={`/Donations/${encodeURIComponent(row.id as string)}`}
            fz="sm"
          >
            {row.title}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <DateFormat dateString={row.pick_up_deadline} />
        </Table.Td>
        <Table.Td>
          <Anchor component={Link} href="/" fz="sm">
            {row.donor}
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
            <Table.Th>Title</Table.Th>
            <Table.Th>Deadline</Table.Th>
            <Table.Th>Donor</Table.Th>
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
