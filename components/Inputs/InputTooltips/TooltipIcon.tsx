import { TextInput, Tooltip, Center, Text, rem } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { FC } from 'react';

interface TooltipIconProps {
  label: string;
  placeholder: string;
}

const TooltipIcon: FC<TooltipIconProps> = (props) => {
  const rightSection = (
    <Tooltip
      label="We store your data securely"
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
    <TextInput rightSection={rightSection} label={props.label} placeholder={props.placeholder} />
  );
};

export default function InputTooltip() {
  return (
    <>
      <TooltipIcon label="" placeholder="" />
    </>
  );
}
