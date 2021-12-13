import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Button, Link, Typography } from '@mui/material'
import TextField from '@src/components/text-field'
import AuthLayout from '@src/layouts/AuthLayout'
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
  const [inputName, nameHandler] = useTextField()
  const [inputEmail, emailHandler] = useTextField({ validator: emailValidator })
  const [inputPassword, passwordHandler] = useTextField()
  const [inputRePassword, rePasswordHandler] = useTextField()
  const router = useRouter()

  const submit = () => {
    nameHandler.checkError()
    emailHandler.checkError()
    passwordHandler.checkError()
    rePasswordHandler.checkError()
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
          Register
        </Typography>
        <TextField
          label="Nama Lengkap"
          fullWidth
          onChange={nameHandler.onChange}
          value={inputName.value}
          error={!!inputName.errorMessage}
          errorMessage={inputName.errorMessage}
        />
        <TextField
          label="Email"
          fullWidth
          onChange={emailHandler.onChange}
          value={inputEmail.value}
          error={!!inputEmail.errorMessage}
          errorMessage={inputEmail.errorMessage}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          onChange={passwordHandler.onChange}
          value={inputPassword.value}
          error={!!inputPassword.errorMessage}
          errorMessage={inputPassword.errorMessage}
        />
        <TextField
          label="Ulangi Password"
          fullWidth
          style={{ marginBottom: '48px' }}
          type="password"
          onChange={rePasswordHandler.onChange}
          value={inputRePassword.value}
          error={!!inputRePassword.errorMessage}
          errorMessage={inputRePassword.errorMessage}
        />
        <Button variant="contained" fullWidth onClick={submit}>
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
