import React, { useMemo } from 'react'
import { NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const EditContactPage: NextPage = () => {
  const router = useRouter()

  const id = useMemo(() => {
    return router.query.id
  }, [router.query])

  return (
    <Container>
      <Typography>Edit contact</Typography>
    </Container>
  )
}

export default EditContactPage
