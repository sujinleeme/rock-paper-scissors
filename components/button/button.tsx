import {
  Button as ButtonBase,
  ButtonProps as ButtonPropsBase,
} from '@chakra-ui/react'

export interface ButtonProps extends ButtonPropsBase {
  variant?: 'primary' | 'secondary'
}
export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  ...props
}) => {
  return (
    <ButtonBase
      boxShadow="md"
      rounded="full"
      fontWeight="normal"
      outline={1}
      variant={variant === 'primary' ? 'solid' : 'outline'}
      _hover={{ bg: '#ebedf0' }}
      px={6}
      py={5}
      {...props}
    />
  )
}
