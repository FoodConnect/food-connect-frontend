import { useState } from 'react';
import { UnstyledButton, Checkbox, Text } from '@mantine/core';
import classes from './CheckboxCard.module.css';
import { useDonationFormContext } from '@/components/DonationForm/DonationFormContext';

interface CheckboxCard {
  label: string;
  description: string;
}

const CheckboxCard = (props: CheckboxCard) => {
  const [value, onChange] = useState(true);
  const form = useDonationFormContext();

  return (
    <UnstyledButton onClick={() => onChange(!value)} className={classes.button}>
      <Checkbox
        checked={value}
        tabIndex={-1}
        size="md"
        mr="xl"
        color="shrek"
        styles={{ input: { cursor: 'pointer' } }}
        aria-hidden
        {...form.getInputProps('is_available')}
      />

      <div>
        <Text fw={500} mb={7} lh={1}>
          {props.label}
        </Text>
        <Text fz="sm" c="dimmed">
          {props.description}
        </Text>
      </div>
    </UnstyledButton>
  );
};
export default CheckboxCard;
