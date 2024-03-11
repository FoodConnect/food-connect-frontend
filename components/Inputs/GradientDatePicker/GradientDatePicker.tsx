import { DatePicker, DatePickerProps, DateValue } from '@mantine/dates';
import { Indicator } from '@mantine/core';
import classes from './GradientDatePicker.module.css';

const dayRenderer: DatePickerProps['renderDay'] = (date) => {
  const day = date.getDate();
  const today = new Date().getDate();

  return (
    <Indicator size={6} color="red" offset={-5} disabled={day !== today}>
      <div>{day}</div>
    </Indicator>
  );
};

const GradientSegmentedControl = (props: {
  value: DateValue | undefined;
  setValue: ((value: DateValue) => void) | undefined;
}) => (
  <DatePicker
    renderDay={dayRenderer}
    value={props.value}
    onChange={props.setValue}
    classNames={{ day: classes.day }}
  />
);
export default GradientSegmentedControl;
