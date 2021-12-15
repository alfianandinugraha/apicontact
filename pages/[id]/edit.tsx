import React, { useEffect, useMemo, useState } from 'react'
import { NextPage } from 'next'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import ContactAppBar from '@src/components/contact-app-bar'
import ContactForm from '@src/components/contact-form'
import { Contact } from 'types'
import contactService from '@src/services/contact'
import Loading from '@src/components/loading'
import toast from 'react-hot-toast'
import Toast from '@src/components/toast'

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
    <Container maxWidth="sm" sx={{ my: '150px' }}>
      <ContactAppBar
        variant="EDIT"
        onClickDelete={async () => {
          console.log(`Deleting ${contactId}...`)
          try {
            await contactService.delete(contactId)
            router.back()
          } catch (err) {
            console.error(err)
          }
        }}
      />
      {isLoading ? (
        <Loading />
      ) : contact ? (
        <ContactForm
          variant="EDIT"
          initialItem={contact}
          onSubmit={async (payload) => {
            const newItems = payload.contacts.map((item) => item.value)
            console.log('Send request...')

            try {
              const result = await contactService.update(contactId, {
                fullName: payload.fullName,
                items: newItems,
              })
              setContact(result.body)
              toast.success(<Toast>Update berhasil</Toast>)
            } catch (err: any) {
              console.error(err)
              toast.success(<Toast>Terjadi kesalahan</Toast>)
            }
          }}
        />
      ) : null}
    </Container>
  )
}

export default EditContactPage
