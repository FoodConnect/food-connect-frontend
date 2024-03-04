import { Grid, ScrollArea, Skeleton, Text } from '@mantine/core';
import GradientSegmentedControl from '../Inputs/GradientSegmentControl/GradientSegmentedControl';
import TooltipIcon from '../Inputs/InputTooltips/TooltipIcon';

export default function DonationForm() {
  const tooltipText =
    'Write something that describes your donation concisely for charities to veiw.';
  const categoryOptions = ['Produce', 'Canned', 'Dairy', 'Dry'];
  const child = <Skeleton height={140} radius="md" animate={false} />;
  return (
    <Grid>
      <Grid.Col span={{ base: 12, xs: 3 }}>
        <TooltipIcon tooltipText={tooltipText} label="Title" placeholder="Donation title..." />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 6 }}>
        <Text size="sm" fw={500} mt={3}>
          Category
        </Text>
        <ScrollArea.Autosize maw={600} type="never">
          <GradientSegmentedControl categoryOptions={categoryOptions} />
        </ScrollArea.Autosize>
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
    </Grid>
  );
}
