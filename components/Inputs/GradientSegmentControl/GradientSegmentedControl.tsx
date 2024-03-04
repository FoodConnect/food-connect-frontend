import { SegmentedControl } from '@mantine/core';
import { FC } from 'react';
import classes from './GradientSegmentedControl.module.css';

interface GradientSegmentedControlProps {
  categoryOptions: string[];
}
const GradientSegmentedControl: FC<GradientSegmentedControlProps> = (props) => (
  <SegmentedControl radius="xl" size="md" data={props.categoryOptions} classNames={classes} />
);
export default GradientSegmentedControl;
