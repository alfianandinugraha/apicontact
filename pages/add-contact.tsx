import React from 'react'
import { NextPage } from 'next'
import { Container } from '@mui/material'
import ContactForm from '@src/components/contact-form'
import BaseLayout from '@src/layouts/base-layout'
import ContactAppBar from '@src/components/contact-app-bar'
import contactService from '@src/services/contact'
import { useRouter } from 'next/router'

const AddContactPage: NextPage = () => {
  const router = useRouter()

  return (
    <BaseLayout>
      <div style={{ marginTop: '150px' }}></div>
      <ContactAppBar variant="ADD" />
      <ContactForm
        variant="ADD"
        onSubmit={async (payload) => {
          const items = payload.contacts
            .map((item) => item.value)
            .filter((value) => !!value)

          await contactService.store({
            ...payload,
            items,
          })

          router.back()
        }}
      />
    </BaseLayout>
  )
}

export default AddContactPage
