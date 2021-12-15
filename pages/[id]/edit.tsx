import React, { useEffect, useMemo, useState } from 'react'
import { NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import ContactAppBar from '@src/components/contact-app-bar'
import ContactForm from '@src/components/contact-form'
import { Contact } from 'types'
import { nanoid } from 'nanoid'
import userService from '@src/services/user'
import contactService from '@src/services/contact'
import Loading from '@src/components/loading'

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
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const contactId = useMemo(() => {
    return router.query.id as string
  }, [router.query])

  useEffect(() => {
    if (!contactId) {
      return
    }

    const getProfile = async () => {
      try {
        const result = await contactService.getById(contactId)
        setIsLoading(true)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    getProfile()
  }, [contactId])

  return (
    <>
      <ContactAppBar variant="EDIT" />
      <Container sx={{ mt: '30px', mb: '60px' }}>
        {isLoading ? (
          <Loading />
        ) : (
          <ContactForm
            variant="EDIT"
            initialItem={contacts}
            onSubmit={(payload) => {
              console.log(payload)
              console.log('Send request...')
            }}
          />
        )}
      </Container>
    </>
  )
}

export default EditContactPage
