import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Button, Link, Typography } from '@mui/material'
import AuthLayout from '@src/layouts/AuthLayout'
import TextField from '@src/components/text-field'
import useTextField from '@src/hooks/use-text-field'
import validator from 'validator'
import { inputErrorMessage } from '@src/const/messages'

const emailValidator = (e: any) => {
  if (!validator.isEmail(e.value)) {
    return inputErrorMessage.INVALID_EMAIL
  }
  return e.errorMessage
}

const LoginPage: NextPage = () => {
  const [inputEmail, emailHandler] = useTextField({
    validator: emailValidator,
  })
  const [inputPassword, passwordHandler] = useTextField()
  const router = useRouter()

  const submit = () => {
    emailHandler.checkError()
    passwordHandler.checkError()

    if (inputEmail.errorMessage || inputPassword.errorMessage) {
      console.error('Input error !')
      return
    }

    console.log('Send request...')
  }

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
        <TextField
          fullWidth
          label="Email"
          onChange={emailHandler.onChange}
          value={inputEmail.value}
          error={!!inputEmail.errorMessage}
          errorMessage={inputEmail.errorMessage}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          onChange={passwordHandler.onChange}
          value={inputPassword.value}
          error={!!inputPassword.errorMessage}
          errorMessage={inputPassword.errorMessage}
        />
        <div style={{ marginBottom: '48px' }} />
        <Button variant="contained" fullWidth onClick={submit}>
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
