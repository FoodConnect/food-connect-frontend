import { Button, Grid, NumberInput, ScrollArea, Text, Textarea } from '@mantine/core';
import { useState } from 'react';
import { DateValue } from '@mantine/dates';
import { IconCircleArrowUpRight } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import GradientSegmentedControl from '../Inputs/GradientSegmentControl/GradientSegmentedControl';
import TooltipIcon from '../Inputs/InputTooltips/TooltipIcon';
import GradientDatePicker from '../Inputs/GradientDatePicker/GradientDatePicker';
import CheckboxCard from '../Inputs/CheckboxCard/CheckboxCard';
import { DropzoneButton } from '../Inputs/DopzoneButton/DropzoneButton';
import { DonationFormProvider, useDonationForm } from './DonationFormContext';

interface FormValues {
  title: string;
  image_data: string;
  description: string;
  total_inventory: number;
  claimed_inventory: number;
  remaining_inventory: number;
  pick_up_deadline: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  is_available: boolean;
}

export default function DonationForm() {
  const [dateValue, setDateValue] = useState<DateValue>(new Date());
  const form = useDonationForm({
    initialValues: {
      title: '',
      image_data: '',
      description: '',
      total_inventory: 0,
      claimed_inventory: 0,
      remaining_inventory: 0,
      pick_up_deadline: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      is_available: false,
    },
    validate: {
      title: (value) => (value !== '' ? null : 'Please enter a title'),
    },
  });

  // Form Submission Methods
  const handleSubmit = async (values: FormValues) => {
    const request = await fetch('http://localhost:8080/donations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const result = await request.json();

    if (result.data !== 'ok') {
      showNotification({
        title: 'Error Submitting',
        color: 'red',
        message: 'Sorry, there was an error submitting your request.',
      });
      return;
    }
    showNotification({
      title: 'Success Submitting',
      color: 'green',
      message: 'Your request has been successfully submitted.',
    });
    form.setValues({
      title: '',
      image_data: '',
      description: '',
      total_inventory: 0,
      claimed_inventory: 0,
      remaining_inventory: 0,
      pick_up_deadline: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      is_available: true,
    });
  };

  // Text and Option Variables
  const donationTooltipText =
    'Write something that describes your donation concisely for charities to veiw.';
  const imageUrlTooltipText =
    'This field will eventually go away. It exists to save Image URLs until the above dropzone is functioning.';
  const categoryOptions = ['Produce', 'Canned', 'Dairy', 'Dry'];

  return (
    <DonationFormProvider form={form}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid>
          <Grid.Col span={{ base: 12, xs: 4 }}>
            <TooltipIcon
              tooltipText={donationTooltipText}
              label="Title"
              placeholder="Donation title..."
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
              <GradientSegmentedControl categoryOptions={categoryOptions} />
            </ScrollArea.Autosize>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}>
            <Text size="sm" fw={500} mt={3}>
              Pick-Up Deadline
            </Text>
            <GradientDatePicker value={dateValue} setValue={setDateValue} />
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
      </form>
    </DonationFormProvider>
  );
}
