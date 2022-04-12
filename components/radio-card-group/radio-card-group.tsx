import {
  Box,
  HStack,
  useRadioGroup,
  UseRadioGroupProps,
  UseRadioProps,
} from '@chakra-ui/react'
import { RadioCard } from '@components'

interface RadioCardGroupProps extends UseRadioGroupProps {
  radioComponent?: React.ComponentType<UseRadioProps>
  options: {
    label: string
    value: string | number
  }[]
}

export const RadioCardGroup: React.FC<RadioCardGroupProps> = ({
  options,
  radioComponent,
  isDisabled,
  ...rest
}) => {
  const { getRootProps, getRadioProps, onChange } = useRadioGroup({
    ...rest,
  })

  const group = getRootProps()

  return (
    <HStack spacing={4} {...group}>
      {options.map(({ label, value }) => (
        <RadioCard
          onChange={onChange}
          isDisabled={isDisabled}
          key={`${label}-${value}`}
          Component={radioComponent}
          {...getRadioProps({ value })}
        >
          {label}
        </RadioCard>
      ))}
    </HStack>
  )
}
