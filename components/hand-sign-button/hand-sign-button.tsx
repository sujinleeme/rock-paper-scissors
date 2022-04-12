import React from 'react'

import { Center, RadioProps } from '@chakra-ui/react'
import { PaperIcon, RockIcon, ScissorsIcon } from '@components'
import { Choice, Size } from '@types'

export type HandSignButtonProps = RadioProps & {
  size?: 'xs' | 'sm' | 'md'
}

export const HandSignButton: React.FC<HandSignButtonProps> = ({
  value,
  size = 'sm',
  ...rest
}) => {
  const Icon = {
    empty: undefined,
    [Choice.rock]: RockIcon,
    [Choice.paper]: PaperIcon,
    [Choice.scissors]: ScissorsIcon,
  }[value || 'empty']

  const containerWidth = ['32px', '50px', '70px']
  const iconWidth = [8, 8, '35px']

  const h = containerWidth[Size[size as keyof typeof Size]]
  const iW = iconWidth[Size[size as keyof typeof Size]]
  return (
    <Center
      value={value}
      borderWidth={1}
      borderRadius="full"
      h={h}
      w={h}
      aria-label={`choice-${value || ''}`}
      _checked={{
        bg: 'gray.200',
      }}
      _hover={{
        bg: 'gray.100',
      }}
      {...rest}
    >
      {Icon && <Icon w={iW} h="full" />}
    </Center>
  )
}
