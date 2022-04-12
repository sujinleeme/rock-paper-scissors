import {
  Popover as PopoverBase,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverProps as PopoverPropsBase,
  PopoverTrigger,
} from '@chakra-ui/react'

export interface PopoverProps extends PopoverPropsBase {
  header: string
  toggler: React.ReactNode
}

export const Popover: React.FC<PopoverProps> = ({
  toggler,
  children,
  header,
  ...rest
}) => {
  return (
    <PopoverBase placement="top" {...rest}>
      <PopoverTrigger>{toggler}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader fontSize="md">{header}</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </PopoverBase>
  )
}
