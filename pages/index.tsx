/* eslint-disable @next/next/no-img-element */
import { ModeNight } from '@mui/icons-material'
import { Box, Container, styled, Typography } from '@mui/material'
import Loading from '@src/components/loading'
import SearchTextField from '@src/components/search-input'
import useTextField from '@src/hooks/use-text-field'
import BaseLayout from '@src/layouts/base-layout'
import contactService from '@src/services/contact'
import useAuth from '@src/stores/user'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Contact } from 'types'

const ContactItem = styled('div')({
  padding: '16px',
  borderBottom: '1px solid #353535',
  cursor: 'pointer',
})

const Home: NextPage = () => {
  const user = useAuth((state) => state.user)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [query, setQuery] = useState('')
  const [isFetching, setIsFetching] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setIsFetching(true)
    const fetchContact = async () => {
      try {
        const result = await contactService.getAll(query)
        setContacts(result.body)
      } catch (err) {
        console.log(err)
      } finally {
        setIsFetching(false)
      }
    }
    fetchContact()
  }, [query])

  const EmptyComponent = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ mt: '2rem' }}
      >
        <ModeNight fontSize="large" sx={{ color: '#808080', mb: '8px' }} />
        <Typography textAlign="center" variant="caption" color="#808080">
          Tidak ada kontak yang ditemukan
        </Typography>
      </Box>
    )
  }

  return (
    <BaseLayout>
      <Typography
        color="primary"
        style={{ marginTop: '64px', marginBottom: '20px' }}
        variant="h5"
      >
        APIContact
      </Typography>
      <SearchTextField
        onChange={() => {
          setIsFetching(true)
          setContacts([])
        }}
        onChangeDebounce={(value) => {
          setQuery(value)
        }}
      />
      <Typography
        variant="caption"
        style={{
          textTransform: 'uppercase',
          color: '#808080',
        }}
      >
        Kontak {user?.email ?? 'Shahbae3@gmail.com'}
      </Typography>
      {isFetching ? <Loading label="Memuat data kontak" /> : null}
      {!isFetching && !contacts.length ? <EmptyComponent /> : null}
      {contacts.map((item) => {
        return (
          <ContactItem
            key={item.id}
            onClick={() => {
              router.push(`/${item.id}`)
            }}
          >
            <Typography>{item.fullName}</Typography>
          </ContactItem>
        )
      })}
    </BaseLayout>
  )
}

export default Home
