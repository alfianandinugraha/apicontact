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
          Login
        </Typography>
        <TextField label="Email" fullWidth />
        <TextField
          label="Password"
          fullWidth
          style={{ marginTop: '14px', marginBottom: '48px' }}
        />
        <Button variant="contained" fullWidth>
          Masuk
        </Button>
        <Typography
          align="center"
          variant="caption"
          style={{ marginTop: '14px' }}
        >
          Belum punya akun?{' '}
          <Link onClick={() => router.push('register')}>Daftar</Link>
        </Typography>
      </Box>
    </AuthLayout>
  )
}

export default LoginPage
