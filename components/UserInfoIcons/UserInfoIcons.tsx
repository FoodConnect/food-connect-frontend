import { Avatar, Text, Group } from '@mantine/core';
import { IconAt, IconMapPin } from '@tabler/icons-react';
import classes from './UserInfoIcons.module.css';

interface DonorData {
  donor?: {
    business_name?: string;
    city?: string;
    email?: string;
    image_data?: string;
    phone_number?: string;
    state?: String;
    user_id?: number;
  };
}

const UserInfoIcons = (props: DonorData) => {
  const { donor } = props;
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar src={donor?.image_data} size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            Donor Details
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {donor?.business_name}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {donor?.email}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconMapPin stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {donor?.city}, {donor?.state}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
};
export default UserInfoIcons;
