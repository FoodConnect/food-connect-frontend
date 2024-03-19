import { TextInput, Tooltip, Center, Text, rem } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useDonationFormContext } from '@/components/DonationForm/DonationFormContext';

interface TooltipIconProps {
  label: string;
  placeholder: string;
  tooltipText: string;
  inputRole: string;
}

const TooltipIcon = (props: TooltipIconProps) => {
  const form = useDonationFormContext();
  const rightSection = (
    <Tooltip
      label={props.tooltipText}
      position="top-end"
      withArrow
      transitionProps={{ transition: 'pop-bottom-right' }}
    >
      <Text component="div" c="dimmed" style={{ cursor: 'help' }}>
        <Center>
          <IconInfoCircle style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  );

  return (
    <TextInput
      rightSection={rightSection}
      label={props.label}
      placeholder={props.placeholder}
      required
      {...(props.inputRole === 'image-address'
        ? { ...form.getInputProps('image_data') }
        : { ...form.getInputProps('title') })}
    />
  );
};
export default TooltipIcon;
