import { ReactNode } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { Box, BoxProps, Text, color } from '@stacks/ui';

import { figmaTheme } from '@app/common/utils/figma-theme';

import { Flag } from './layout/flag';
import { Caption } from './typography';

function WarningIcon() {
  return (
    <Box
      _hover={{ cursor: 'pointer' }}
      as={FiAlertCircle}
      color={color('feedback-alert')}
      size="16px"
      minWidth="min-content"
      alignSelf="flex-start"
      position="relative"
      top="2px"
    />
  );
}

interface WarningLabelProps extends BoxProps {
  children: ReactNode | undefined;
  title?: string;
}
export function WarningLabel({ children, title, ...props }: WarningLabelProps) {
  return (
    <Box {...props}>
      <Flag
        bg="#FFF5EB"
        borderRadius="10px"
        img={<WarningIcon />}
        minHeight="48px"
        px="base"
        py="base-tight"
        width="100%"
      >
        {title ? (
          <Text
            color={figmaTheme.text}
            fontSize={1}
            fontWeight={500}
            lineHeight="1.5"
            mb="extra-tight"
          >
            {title}
          </Text>
        ) : null}
        <Caption lineHeight="1.5">{children}</Caption>
      </Flag>
    </Box>
  );
}
