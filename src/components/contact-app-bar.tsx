import { Close, MoreVert } from '@mui/icons-material'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

type ContactAppBarProps = {
  variant: 'ADD' | 'EDIT'
}

const ContactAppBar = (props: ContactAppBarProps) => {
  const router = useRouter()

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Close
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              router.back()
            }}
          />
          <Typography sx={{ flexGrow: 1 }}>
            {props.variant === 'ADD' ? 'Tambah Contact' : 'Edit Contact'}
          </Typography>
          {props.variant !== 'ADD' ? <MoreVert /> : null}
        </Toolbar>
      </AppBar>
      <Typography
        sx={{
          textTransform: 'uppercase',
          backgroundColor: '#1F232A',
          color: '#808080',
          fontSize: '10px',
          px: '16px',
          py: '8px',
        }}
      >
        Kontak Shahbae3@gmail.com
      </Typography>
    </>
  )
}

export default ContactAppBar
