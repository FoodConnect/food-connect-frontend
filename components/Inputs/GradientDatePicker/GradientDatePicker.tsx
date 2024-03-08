import { DatePicker, DateValue } from '@mantine/dates';
import classes from './GradientDatePicker.module.css';

const GradientSegmentedControl = (props: {
  value: DateValue | undefined;
  setValue: ((value: DateValue) => void) | undefined;
}) => (
  <DatePicker value={props.value} onChange={props.setValue} classNames={{ day: classes.day }} />
);
export default GradientSegmentedControl;
