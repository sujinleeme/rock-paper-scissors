import React from 'react'

import { Box, RadioProps, useRadio } from '@chakra-ui/react'

export type RadioCardProps = RadioProps & {
  children: React.ReactNode
  Component?: React.ComponentType<RadioProps>
}

export const RadioCard: React.FC<RadioCardProps> = ({
  Component = Box,
  children,
  ...rest
}) => {
  const { getInputProps, getCheckboxProps } = useRadio(rest)
  const input = getInputProps()
  const checkbox = getCheckboxProps()
  return (
    <Box as="label">
      <input {...input} />
      <Component {...checkbox} value={rest.value} cursor="pointer">
        {children}
      </Component>
    </Box>
  )
}
