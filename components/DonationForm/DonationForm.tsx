import { Grid, NumberInput, ScrollArea, Text, Textarea } from '@mantine/core';
import { useState } from 'react';
import { DateValue } from '@mantine/dates';
import GradientSegmentedControl from '../Inputs/GradientSegmentControl/GradientSegmentedControl';
import TooltipIcon from '../Inputs/InputTooltips/TooltipIcon';
import GradientDatePicker from '../Inputs/GradientDatePicker/GradientDatePicker';
import CheckboxCard from '../Inputs/CheckboxCard/CheckboxCard';
import { DropzoneButton } from '../Inputs/DopzoneButton/DropzoneButton';

export default function DonationForm() {
  const donationTooltipText =
    'Write something that describes your donation concisely for charities to veiw.';
  const imageUrlTooltipText =
    'This field will eventually go away. It exists to save Image URLs until the above dropzone is functioning.';
  const categoryOptions = ['Produce', 'Canned', 'Dairy', 'Dry'];
  const [value, setValue] = useState<DateValue>(new Date());

  return (
    <Grid>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <TooltipIcon
          tooltipText={donationTooltipText}
          label="Title"
          placeholder="Donation title..."
        />
        <Textarea
          label="Description"
          placeholder="Write something about your donation..."
          autosize
          minRows={6}
          maxRows={6}
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
        <CheckboxCard
          label="Currently Available"
          description="You can change this at any point in your donation's settings"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <DropzoneButton />
        <TooltipIcon
          tooltipText={imageUrlTooltipText}
          label="Image URL"
          placeholder="Image Address..."
        />
      </Grid.Col>
    </Grid>
  );
}
