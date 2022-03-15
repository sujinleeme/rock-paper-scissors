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
  ...rest
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    ...rest,
  })

  console.log(rest)

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map(({ label, value }) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={`${label}-${value}`} {...radio}>
            {label}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
