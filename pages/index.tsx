/* eslint-disable @next/next/no-img-element */
import {
  Box,
  CircularProgress,
  Container,
  Link,
  styled,
  Typography,
} from '@mui/material'
import Navigation from '@src/components/navigation'
import TextField from '@src/components/text-field'
import BaseLayout from '@src/layouts/base-layout'
import contactService from '@src/services/contact'
import { nanoid } from 'nanoid'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Contact } from 'types'

const ContactItem = styled('div')({
  padding: '16px',
  borderBottom: '1px solid #353535',
  cursor: 'pointer',
})

const Home: NextPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const result = await contactService.getAll()
        setContacts(result.body)
        setIsFetching(true)
      } catch (err) {
        console.log(err)
      } finally {
        setIsFetching(false)
      }
    }

    fetchContact()
  }, [])

  return (
    <BaseLayout>
      <Container>
        <Typography
          color="primary"
          style={{ marginTop: '64px', marginBottom: '20px' }}
          variant="h5"
        >
          APIContact
        </Typography>
        <TextField label="Cari kontak disini" />
        <Typography
          variant="caption"
          style={{
            textTransform: 'uppercase',
            color: '#808080',
          }}
        >
          Kontak Shahbae3@gmail.com
        </Typography>
        {isFetching ? (
          <Box
            display="flex"
            justifyContent="center"
            sx={{ marginTop: '2rem' }}
          >
            <CircularProgress />
          </Box>
        ) : null}
        {contacts.map((item) => {
          return (
            <ContactItem
              key={item.id}
              onClick={() => {
                router.push(`/${item.id}/edit`)
              }}
            >
              <Typography>{item.fullName}</Typography>
            </ContactItem>
          )
        })}
      </Container>
    </BaseLayout>
  )
}

export default Home
