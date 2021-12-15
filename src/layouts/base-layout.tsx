import Navigation from '@src/components/navigation'
import useAuth from '@src/stores/user'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import shallow from 'zustand/shallow'

interface BaseLayoutProps {
  children: React.ReactNode
}

const BaseLayout = (props: BaseLayoutProps) => {
  const { user, isLoading } = useAuth(
    (state) => ({ user: state.user, isLoading: state.isLoading }),
    shallow
  )
  const router = useRouter()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (!user) {
      router.push('/login')
    }
  }, [user, isLoading])

  if (isLoading) {
    return <></>
  }

  return user ? (
    <>
      {props.children}
      <Navigation />
    </>
  ) : null
}

export default BaseLayout
