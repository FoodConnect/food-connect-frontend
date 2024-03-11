import { Progress, Box, Text, Group, Paper, SimpleGrid, Flex } from '@mantine/core';
import { IconCarrot, IconDeviceAnalytics } from '@tabler/icons-react';
import { FC } from 'react';
import classes from './StatsSegments.module.css';
import { theme } from '@/theme';

interface StatsSegmentsProps {
  claimed: number;
  remaining: number;
}

const StatsSegments: FC<StatsSegmentsProps> = (props) => {
  const totalInventory = props.remaining + props.claimed;
  const remainingInventory = Math.round((props.remaining / totalInventory) * 100);
  const claimedInventory = Math.round((props.claimed / totalInventory) * 100);

  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Group align="flex-end" gap="xs">
          <Text fz="xl" fw={700}>
            {totalInventory}
          </Text>
          <Text c="grey" className={classes.diff} fz="sm" fw={700}>
            <span>
              <IconCarrot />
            </span>
            {/* <IconCarrot size="1rem" style={{ marginBottom: rem(4) }} stroke={1.5} /> */}
          </Text>
        </Group>
        <IconDeviceAnalytics size="1.4rem" className={classes.icon} stroke={1.5} />
      </Group>

      <Text c="dimmed" fz="sm">
        Total units of donation available by donor
      </Text>

      <Progress.Root size={34} classNames={{ label: classes.progressLabel }} mt={40}>
        <Progress.Section value={claimedInventory} color="shrek">
          <Progress.Label>{claimedInventory}%</Progress.Label>
        </Progress.Section>
        <Progress.Section value={remainingInventory} color="teal">
          <Progress.Label>{remainingInventory}%</Progress.Label>
        </Progress.Section>
      </Progress.Root>
      <SimpleGrid cols={{ base: 1, xs: 3 }} mt="xl">
        <Box style={{ borderBottomColor: theme!.colors!.shrek![5] }} className={classes.stat}>
          <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
            Claimed
          </Text>
          <Flex justify="space-between" direction="column" align="flex-start" gap={0}>
            <Text fw={700}>{totalInventory}</Text>
            <Text c="shrek" fw={700} size="sm" className={classes.statCount}>
              {claimedInventory}%
            </Text>
          </Flex>
        </Box>
        <Box style={{ borderBottomColor: theme!.colors!.teal![6] }} className={classes.stat}>
          <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
            Remaining
          </Text>
          <Flex justify="space-between" direction="column" align="flex-start" gap={0}>
            <Text fw={700}>{props.remaining}</Text>
            <Text c="teal" fw={700} size="sm" className={classes.statCount}>
              {remainingInventory}%
            </Text>
          </Flex>
        </Box>
      </SimpleGrid>
    </Paper>
  );
};
export default StatsSegments;
