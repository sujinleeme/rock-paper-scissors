import { Box, useRadio, UseRadioProps } from '@chakra-ui/react'

export type RadioCardProps = UseRadioProps

export const RadioCard: React.FC<RadioCardProps> = ({ children, ...rest }) => {
  const { getInputProps, getCheckboxProps } = useRadio(rest)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  )
}
