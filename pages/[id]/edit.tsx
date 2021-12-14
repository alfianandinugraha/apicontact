import React, { useMemo } from 'react'
import { NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import ContactAppBar from '@src/components/contact-app-bar'
import ContactForm from '@src/components/contact-form'
import { Contact } from 'types'
import { nanoid } from 'nanoid'

const contacts: Contact = {
  id: nanoid(),
  userId: '1',
  fullName: 'Alfian Andi',
  items: [
    {
      id: nanoid(),
      contact: '0813-1458-1924',
    },
  ],
}

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
          initialItem={contacts}
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
