import Navigation from '@src/components/navigation'
import React from 'react'

interface BaseLayoutProps {
  children: React.ReactNode
}

const BaseLayout = (props: BaseLayoutProps) => {
  return (
    <>
      {props.children}
      <Navigation />
    </>
  )
}

export default BaseLayout
