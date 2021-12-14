/* eslint-disable @next/next/no-img-element */
import { Box, Container, Link, styled, Typography } from '@mui/material'
import Navigation from '@src/components/navigation'
import TextField from '@src/components/text-field'
import BaseLayout from '@src/layouts/base-layout'
import { nanoid } from 'nanoid'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Contact } from 'types'

const contacts: Contact[] = [
  {
    id: nanoid(),
    userId: '1',
    fullName: 'Alfian Andi',
    items: [
      {
        id: nanoid(),
        contact: '0813-1458-1924',
      },
    ],
  },
  {
    id: nanoid(),
    userId: '1',
    fullName: 'Shah Alam',
    items: [
      {
        id: nanoid(),
        contact: '0813-1458-1924',
      },
    ],
  },
]

const ContactItem = styled('div')({
  padding: '16px',
  borderBottom: '1px solid #353535',
  cursor: 'pointer',
})

const Home: NextPage = () => {
  const router = useRouter()

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
