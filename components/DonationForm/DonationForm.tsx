import { Grid, NumberInput, ScrollArea, Skeleton, Text, Textarea } from '@mantine/core';
import { useState } from 'react';
import { DateValue } from '@mantine/dates';
import GradientSegmentedControl from '../Inputs/GradientSegmentControl/GradientSegmentedControl';
import TooltipIcon from '../Inputs/InputTooltips/TooltipIcon';
import GradientDatePicker from '../Inputs/GradientDatePicker/GradientDatePicker';

export default function DonationForm() {
  const tooltipText =
    'Write something that describes your donation concisely for charities to veiw.';
  const categoryOptions = ['Produce', 'Canned', 'Dairy', 'Dry'];
  const child = <Skeleton height={300} radius="md" animate={false} />;
  const [value, setValue] = useState<DateValue>(new Date());
  return (
    <Grid>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <TooltipIcon tooltipText={tooltipText} label="Title" placeholder="Donation title..." />
        <Textarea
          label="Description"
          placeholder="Write something about your donation..."
          autosize
          minRows={2}
          maxRows={4}
        />
        <NumberInput
          label="Quantity"
          description="How many of this item are you donating?"
          placeholder="0"
        />
        <Text size="sm" fw={500} mt={3}>
          Category
        </Text>
        <ScrollArea.Autosize maw={600} type="never">
          <GradientSegmentedControl categoryOptions={categoryOptions} />
        </ScrollArea.Autosize>
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <Text size="sm" fw={500} mt={3}>
          Pick-Up Deadline
        </Text>
        <GradientDatePicker value={value} setValue={setValue} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
    </Grid>
  );
}
