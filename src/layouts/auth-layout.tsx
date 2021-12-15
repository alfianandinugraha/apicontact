import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import useAuth from '@src/stores/user'
import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = (props: AuthLayoutProps): React.ReactElement => {
  const { user, isLoading } = useAuth(
    (state) => ({ user: state.user, isLoading: state.isLoading }),
    shallow
  )
  const router = useRouter()

  useEffect(() => {
    if (isLoading) {
      return
    }
    if (user) {
      router.push('/')
    }
  }, [user, isLoading])

  if (isLoading) {
    return <></>
  }

  return !user ? (
    <Container maxWidth="sm" style={{ marginTop: '140px' }}>
      {props.children}
    </Container>
  ) : (
    <></>
  )
}

export default AuthLayout
