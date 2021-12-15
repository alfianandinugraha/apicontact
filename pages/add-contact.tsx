import React from 'react'
import { NextPage } from 'next'
import { Container } from '@mui/material'
import ContactForm from '@src/components/contact-form'
import BaseLayout from '@src/layouts/base-layout'
import ContactAppBar from '@src/components/contact-app-bar'
import contactService from '@src/services/contact'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Toast from '@src/components/toast'
import Head from 'next/head'

const AddContactPage: NextPage = () => {
  const router = useRouter()

  return (
    <BaseLayout>
      <Head>
        <title>Tambah Kontak | ApiContact</title>
      </Head>
      <div style={{ marginTop: '150px' }}></div>
      <ContactAppBar variant="ADD" />
      <ContactForm
        variant="ADD"
        onSubmit={async (payload) => {
          const items = payload.contacts
            .map((item) => item.value)
            .filter((value) => !!value)

          try {
            await contactService.store({
              ...payload,
              items,
            })
            router.back()
          } catch (err: any) {
            if (err.response) {
              toast.error(<Toast>{err.response.data.message}</Toast>)
            }
          }
        }}
      />
    </BaseLayout>
  )
}

export default AddContactPage
