import { Button, ButtonProps, Link } from '@mui/material'
import React from 'react'

interface ButtonLinkProps extends ButtonProps {
  href: string
  target: string
}

const ButtonLink = (props: ButtonLinkProps): React.ReactElement => {
  return (
    <Link href={props.href} target={props.target} underline="none">
      <Button {...props} />
    </Link>
  )
}

export default ButtonLink
