import Navigation from '@src/components/navigation'
import useAuth from '@src/stores/user'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

interface BaseLayoutProps {
  children: React.ReactNode
}

const BaseLayout = (props: BaseLayoutProps) => {
  const user = useAuth((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user])

  return user ? (
    <>
      {props.children}
      <Navigation />
    </>
  ) : null
}

export default BaseLayout
