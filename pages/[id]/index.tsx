import React, { useEffect, useMemo, useState } from 'react'
import { NextPage } from 'next'
import { Box, Container, Divider, Fab, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import ContactAppBar from '@src/components/contact-app-bar'
import { Contact } from 'types'
import contactService from '@src/services/contact'
import Loading from '@src/components/loading'
import { Edit } from '@mui/icons-material'
import toast from 'react-hot-toast'
import Toast from '@src/components/toast'
import Head from 'next/head'

const SinglePageContact: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [contact, setContact] = useState<Contact | null>(null)
  const router = useRouter()

  const contactId = useMemo(() => {
    return router.query.id as string
  }, [router.query])

  const copy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast.success(<Toast>Berhasil disalin</Toast>)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!contactId) {
      return
    }

    const getContact = async () => {
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

    getContact()
  }, [contactId])

  return (
    <Container maxWidth="sm" sx={{ my: '150px' }}>
      <Head>
        <title>Detail Kontak | ApiContact</title>
      </Head>
      <ContactAppBar
        variant="DETAIL"
        onClickDelete={async () => {
          console.log(`Deleting ${contactId}...`)
          try {
            await contactService.delete(contactId)
            router.push('/')
          } catch (err) {
            console.error(err)
          }
        }}
      />
      {!isLoading ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography color="darkgray">Nama</Typography>
          <Typography variant="h6" sx={{ marginTop: '10px' }}>
            {contact?.fullName}
          </Typography>
          <Divider
            light
            orientation="horizontal"
            sx={{
              width: '100%',
              backgroundColor: '#808080',
              height: '1px',
              my: '24px',
            }}
          />
          <Typography color="darkgray">No Telepon</Typography>
          {contact?.items.map((item) => {
            return (
              <Box
                key={item.id}
                display="flex"
                alignItems="center"
                sx={{ marginTop: '10px' }}
              >
                <Typography variant="h6">{item.contact}</Typography>
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ ml: '12px', cursor: 'pointer' }}
                  onClick={() => {
                    copy(item.contact)
                  }}
                >
                  salin
                </Typography>
              </Box>
            )
          })}
          <Fab
            variant="extended"
            color="primary"
            sx={{ position: 'absolute', right: '20px', bottom: '20px' }}
            onClick={() => {
              router.push(`/${contactId}/edit`)
            }}
          >
            <Edit />
            <Typography color="white" sx={{ fontSize: '14px', ml: '8px' }}>
              Edit Kontak
            </Typography>
          </Fab>
        </Box>
      ) : (
        <Loading />
      )}
    </Container>
  )
}

export default SinglePageContact
