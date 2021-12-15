import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Button, Link, Typography } from '@mui/material'
import AuthLayout from '@src/layouts/auth-layout'
import TextField from '@src/components/text-field'
import useTextField from '@src/hooks/use-text-field'
import validator from 'validator'
import { inputErrorMessage } from '@src/const/messages'
import userService from '@src/services/user'
import useAuth from '@src/stores/user'
import toast from 'react-hot-toast'
import Toast from '@src/components/toast'
import Head from 'next/head'

const emailValidator = (e: any) => {
  if (!validator.isEmail(e.value)) {
    return inputErrorMessage.INVALID_EMAIL
  }
  return e.errorMessage
}

const LoginPage: NextPage = () => {
  const setUser = useAuth((state) => state.setUser)
  const [inputEmail, emailHandler] = useTextField({
    validator: emailValidator,
  })
  const [inputPassword, passwordHandler] = useTextField()
  const router = useRouter()

  const submit = async () => {
    const isEmailError = emailHandler.checkError()
    const isPasswordError = passwordHandler.checkError()

    if (isEmailError || isPasswordError) {
      console.error('Input error !')
      return
    }

    try {
      const result = await userService.login(
        inputEmail.value,
        inputPassword.value
      )
      setUser(result.body.user)
      router.push('/')
    } catch (err: any) {
      if (err.response) {
        toast.error(<Toast>{err.response.data.message}</Toast>)
      }
      console.error(err)
    }
  }

  return (
    <AuthLayout>
      <Head>
        <title>Login | ApiContact</title>
      </Head>
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
