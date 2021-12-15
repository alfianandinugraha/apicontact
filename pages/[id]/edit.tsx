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

const EditContactPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [contact, setContact] = useState<Contact | null>(null)
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
        setContact(result.body)
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
        ) : contact ? (
          <ContactForm
            variant="EDIT"
            initialItem={contact}
            onSubmit={(payload) => {
              console.log(payload)
              console.log('Send request...')
            }}
          />
        ) : null}
      </Container>
    </>
  )
}

export default EditContactPage
