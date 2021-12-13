import React from 'react'
import { Container } from '@mui/material'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = (props: AuthLayoutProps): React.ReactElement => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '140px' }}>
      {props.children}
    </Container>
  )
}

export default AuthLayout
