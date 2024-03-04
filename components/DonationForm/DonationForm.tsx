import { Group, Text } from '@mantine/core';
import GradientSegmentedControl from '../Inputs/GradientSegmentControl/GradientSegmentedControl';
import TooltipIcon from '../Inputs/InputTooltips/TooltipIcon';

export default function DonationForm() {
  const tooltipText =
    'Write something that describes your donation concisely for charities to veiw.';
  const categoryOptions = ['All', 'Perishable', 'Canned', 'Dairy', 'Rice', 'Pasta'];
  return (
    <Group>
      <Text size="sm" fw={500} mt={3}>
        Categories
      </Text>
      <GradientSegmentedControl categoryOptions={categoryOptions} />
      <TooltipIcon tooltipText={tooltipText} label="Title" placeholder="Donation title..." />
    </Group>
  );
}
