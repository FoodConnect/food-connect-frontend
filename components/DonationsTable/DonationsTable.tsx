import { Table, Progress, Anchor, Text, Group, Popover, Select, TextInput } from '@mantine/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import classes from './DonationsTable.module.css';
import DateFormat from '../DateFormat';
import { DonationData } from '@/components/Interfaces/DonationData';
import DonationsTableLoading from '../Loading/DonationsTableLoading';
import DonorInfoPopover from '../DonorInfoPopover.tsx/DonorInfoPopover';

const DonationsTable = () => {
  const [tableItems, setTableItems] = useState<DonationData[]>();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const path = useRouter().asPath;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'produce', label: 'produce' },
    { value: 'canned', label: 'canned' },
    { value: 'dairy', label: 'dairy' },
    { value: 'dry', label: 'dry' },
  ];

  // Condition for Donor Donation Page filtered donation list
  const filterData = (data: DonationData[]) => {
    let filteredData = data;

    if (path === '/Donations/donor-donations') {
      filteredData = filteredData.filter((donation) =>
        donation?.donor?.user_id === session?.user.pk);
  }
  if (searchQuery) {
    filteredData = filteredData.filter((donation) =>
      donation?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategory) {
    filteredData = filteredData.filter((donation) =>
      donation?.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  return filteredData;
};

  // *REMOVE* DELAY FUNCTION for Development Presentation of Loading State
  function timeout(delay: number) {
    return new Promise((res) => {
      setTimeout(res, delay);
    });
  }
  // API Call and useEffect Functions to hydrate table
  async function getData() {
    const res = await fetch('http://localhost:8080/donations/');
    await timeout(1000);
    setLoading(false);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        const data = filterData(res);
        setTableItems(data);
      } catch (error) {
        null;
      }
    };

    fetchData();
  }, [session, searchQuery, selectedCategory]);

  const donations = tableItems?.map((donation: DonationData) => {
    const totalInventory = donation.remaining_inventory! + donation.claimed_inventory!;
    const remainingInventory = (donation.remaining_inventory! / totalInventory) * 100;
    const claimedInventory = (donation.claimed_inventory! / totalInventory) * 100;
    const donorName = donation?.donor?.business_name;

    return (
      <Table.Tr key={donation.id}>
        <Table.Td>
          <Anchor
            component={Link}
            href={`/Donations/${encodeURIComponent(donation.id!)}`}
            fz="sm"
            c="navy"
          >
            {donation.title}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <DateFormat dateString={donation.pick_up_deadline} />
        </Table.Td>
        <Table.Td>
          <Popover width={300} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Anchor fz="sm" component="button" type="button" c="navy" size="xs">
                {donorName}
              </Anchor>
            </Popover.Target>
            <Popover.Dropdown>
              <DonorInfoPopover donor={donation?.donor} />
            </Popover.Dropdown>
          </Popover>
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
    <>
    <div className={classes.filters}>
      <TextInput
        placeholder="Search by title"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
      />
      <Select
        placeholder="Select category"
        data={categoryOptions}
        value={selectedCategory}
        onChange={(value) => setSelectedCategory(value || '')}
      />
    </div>
      {loading ? (
        <DonationsTableLoading />
      ) : (
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
            <Table.Tbody>{donations}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </>
  );
};
export default DonationsTable;
