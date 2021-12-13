import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Button, Link, TextField, Typography } from '@mui/material'
import AuthLayout from '@src/layouts/AuthLayout'

const LoginPage: NextPage = () => {
  const router = useRouter()

  return (
    <AuthLayout>
      <Box display="flex" flexDirection="column">
        <Typography
          color="primary"
          variant="h5"
          align="center"
          marginBottom={6}
        >
          Register
        </Typography>
        <TextField label="Nama Lengkap" fullWidth />
        <TextField label="Email" fullWidth />
        <TextField label="Password" fullWidth type="password" />
        <TextField
          label="Ulangi Password"
          fullWidth
          style={{ marginBottom: '48px' }}
          type="password"
        />
        <Button variant="contained" fullWidth>
          Daftar
        </Button>
        <Typography
          align="center"
          variant="caption"
          style={{ marginTop: '14px' }}
        >
          Sudah punya akun?{' '}
          <Link onClick={() => router.push('login')}>Masuk</Link>
        </Typography>
      </Box>
    </AuthLayout>
  )
}

export default LoginPage
