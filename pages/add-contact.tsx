import React from 'react'
import { NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import ContactForm from '@src/components/contact-form'
import BaseLayout from '@src/layouts/base-layout'
import ContactAppBar from '@src/components/contact-app-bar'

const AddContactPage: NextPage = () => {
  return (
    <BaseLayout>
      <ContactAppBar variant="ADD" />
      <Container sx={{ mt: '30px', mb: '60px' }}>
        <ContactForm
          variant="ADD"
          onSubmit={(payload) => {
            console.log(payload)
            console.log('Send request...')
          }}
        />
      </Container>
    </BaseLayout>
  )
}

export default AddContactPage
