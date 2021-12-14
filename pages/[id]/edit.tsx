import React, { useMemo } from 'react'
import { NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import ContactAppBar from '@src/components/contact-app-bar'
import ContactForm from '@src/components/contact-form'

const EditContactPage: NextPage = () => {
  const router = useRouter()

  const id = useMemo(() => {
    return router.query.id
  }, [router.query])

  return (
    <>
      <ContactAppBar variant="EDIT" />
      <Container sx={{ mt: '30px', mb: '60px' }}>
        <ContactForm
          variant="EDIT"
          onSubmit={(payload) => {
            console.log(payload)
            console.log('Send request...')
          }}
        />
      </Container>
    </>
  )
}

export default EditContactPage
