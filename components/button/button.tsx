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
}) => (
  <ButtonBase
    boxShadow="md"
    rounded="full"
    fontWeight="normal"
    outline={1}
    variant={variant === 'primary' ? 'solid' : 'outline'}
    px={6}
    py={5}
    {...props}
  />
)
