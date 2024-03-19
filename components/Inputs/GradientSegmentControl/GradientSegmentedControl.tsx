import { SegmentedControl } from '@mantine/core';
import { FC } from 'react';
import classes from './GradientSegmentedControl.module.css';
import { useDonationFormContext } from '@/components/DonationForm/DonationFormContext';

interface GradientSegmentedControlProps {
  categoryOptions: string[];
}
const GradientSegmentedControl: FC<GradientSegmentedControlProps> = (props) => {
  const form = useDonationFormContext();
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      data={props.categoryOptions}
      classNames={classes}
      {...form.getInputProps('category')}
    />
  );
};
export default GradientSegmentedControl;
