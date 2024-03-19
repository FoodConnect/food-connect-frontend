import { DatePicker, DatePickerProps } from '@mantine/dates';
import { Indicator } from '@mantine/core';
import classes from './GradientDatePicker.module.css';
import { useDonationFormContext } from '@/components/DonationForm/DonationFormContext';

const dayRenderer: DatePickerProps['renderDay'] = (date) => {
  const day = date.getDate();
  const today = new Date().getDate();

  return (
    <Indicator size={6} color="red" offset={-5} disabled={day !== today}>
      <div>{day}</div>
    </Indicator>
  );
};

const GradientDatePicker = () => {
  const form = useDonationFormContext();
  return (
    <DatePicker
      renderDay={dayRenderer}
      classNames={{ day: classes.day }}
      {...form.getInputProps('pick_up_deadline')}
    />
  );
};
export default GradientDatePicker;
