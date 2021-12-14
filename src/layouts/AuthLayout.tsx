import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import useAuth from '@src/stores/user'
import { useRouter } from 'next/router'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = (props: AuthLayoutProps): React.ReactElement => {
  const user = useAuth((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return !user ? (
    <Container maxWidth="sm" style={{ marginTop: '140px' }}>
      {props.children}
    </Container>
  ) : (
    <></>
  )
}

export default AuthLayout
