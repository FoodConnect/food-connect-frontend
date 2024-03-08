import { useState } from 'react';
import { UnstyledButton, Checkbox, Text } from '@mantine/core';
import classes from './CheckboxCard.module.css';

interface CheckboxCard {
  label: string;
  description: string;
}

const CheckboxCard = (props: CheckboxCard) => {
  const [value, onChange] = useState(true);

  return (
    <UnstyledButton onClick={() => onChange(!value)} className={classes.button}>
      <Checkbox
        checked={value}
        onChange={() => {}}
        tabIndex={-1}
        size="md"
        mr="xl"
        color="shrek"
        styles={{ input: { cursor: 'pointer' } }}
        aria-hidden
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
