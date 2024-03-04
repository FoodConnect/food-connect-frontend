import { FC, useState } from 'react';
import { PasswordInput, Tooltip } from '@mantine/core';

interface TooltipFocusProps {
  label: string;
  placeholder: string;
}

const TooltipFocus: FC<TooltipFocusProps> = (props) => {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('');
  const valid = value.trim().length >= 6;
  return (
    <Tooltip
      label={valid ? 'All good!' : 'Password must include at least 6 characters'}
      position="bottom-start"
      withArrow
      opened={opened}
      color={valid ? 'teal' : undefined}
      withinPortal
    >
      <PasswordInput
        label={props.label}
        required
        placeholder={props.placeholder}
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
        mt="md"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </Tooltip>
  );
};
export default TooltipFocus;
