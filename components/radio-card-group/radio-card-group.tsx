import { HStack, useRadioGroup, UseRadioGroupProps } from '@chakra-ui/react'
import { RadioCard } from '@components/radio-card'

interface RadioCardGroupProps extends UseRadioGroupProps {
  options: {
    label: string
    value: string | number
  }[]
}

export const RadioCardGroup: React.FC<RadioCardGroupProps> = ({
  options,
  isDisabled,
  ...rest
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    ...rest,
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map(({ label, value }) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard
            isDisabled={isDisabled}
            key={`${label}-${value}`}
            {...radio}
          >
            {label}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
