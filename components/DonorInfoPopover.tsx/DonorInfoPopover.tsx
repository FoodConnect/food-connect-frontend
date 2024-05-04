import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconCertificate } from '@tabler/icons-react';
import classes from './DonorInfoPopover.module.css';
import { DonorData } from '../Interfaces/DonorData';

const DonorInfoPopover = (props: DonorData) => {
  const { donor } = props;
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={donor?.image_data} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {donor?.business_name}
          </Text>

          <Text c="dimmed" size="xs">
            {donor?.city}, {donor?.state}
          </Text>
        </div>

        <IconCertificate style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
};
export default DonorInfoPopover;
