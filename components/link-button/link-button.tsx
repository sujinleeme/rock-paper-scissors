import Link, { LinkProps } from 'next/link'

import { Button, ButtonProps } from '@components'

type LinkButton = ButtonProps & LinkProps

export const LinkButton: React.FC<LinkButton> = ({
  href,
  children,
  ...props
}) => (
  <Link href={href} passHref>
    <a>
      <Button {...props}>{children}</Button>
    </a>
  </Link>
)
