// DonationForm.tsx
import { Button, Grid, NumberInput, ScrollArea, Text, Textarea } from '@mantine/core';
import { IconCircleArrowUpRight } from '@tabler/icons-react';
import GradientSegmentedControl from '../Inputs/GradientSegmentControl/GradientSegmentedControl';
import TooltipIcon from '../Inputs/InputTooltips/TooltipIcon';
import GradientDatePicker from '../Inputs/GradientDatePicker/GradientDatePicker';
import CheckboxCard from '../Inputs/CheckboxCard/CheckboxCard';
import { DropzoneButton } from '../Inputs/DopzoneButton/DropzoneButton';
import { useDonationFormContext } from './DonationFormContext';

export default function DonationForm() {
  // Form Instantiation
  const form = useDonationFormContext();

  // Text and Option Variables
  const donationTooltipText =
    'Write something that describes your donation concisely for charities to veiw.';
  const imageUrlTooltipText =
    'This field will eventually go away. It exists to save Image URLs until the above dropzone is functioning.';
  const categoryOptions = ['produce', 'canned', 'dairy', 'dry', 'other'];

  return (
    <Grid>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <TooltipIcon
          tooltipText={donationTooltipText}
          label="Title"
          placeholder="Donation title..."
          inputRole="title"
        />
        <Textarea
          label="Description"
          required
          {...form.getInputProps('description')}
          placeholder="Write something about your donation..."
          autosize
          minRows={6}
          maxRows={6}
        />
        <NumberInput
          label="Quantity"
          required
          {...form.getInputProps('remaining_inventory')}
          description="How many of this item are you donating?"
          placeholder="0"
        />
        <Text size="sm" fw={500} mt={3}>
          Category
        </Text>
        <ScrollArea.Autosize maw={600} type="never">
          <GradientSegmentedControl
            categoryOptions={categoryOptions}
            {...form.getInputProps('category')}
          />
        </ScrollArea.Autosize>
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <Text size="sm" fw={500} mt={3}>
          Pick-Up Deadline
        </Text>
        <GradientDatePicker />
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
          inputRole="image-address"
        />
        <Button
          type="submit"
          justify="center"
          m="lg"
          variant="filled"
          color="navy"
          rightSection={<IconCircleArrowUpRight />}
        >
          Submit
        </Button>
      </Grid.Col>
    </Grid>
  );
}
