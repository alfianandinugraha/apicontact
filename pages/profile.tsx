import React from 'react'
import { NextPage } from 'next'
import { Box, Button, Container, Typography } from '@mui/material'
import BaseLayout from '@src/layouts/base-layout'
import { Logout } from '@mui/icons-material'
import TextField from '@src/components/text-field'
import useTextField from '@src/hooks/use-text-field'
import validator from 'validator'
import { inputErrorMessage } from '@src/const/messages'
import { useRouter } from 'next/router'
import userService from '@src/services/user'
import useAuth from '@src/stores/user'
import { UpdateUserBodyRequest } from 'types'
import Head from 'next/head'

const emailValidator = (e: any) => {
  if (!validator.isEmail(e.value)) {
    return inputErrorMessage.INVALID_EMAIL
  }
  return e.errorMessage
}

const ProfilePage: NextPage = () => {
  const setUser = useAuth((state) => state.setUser)
  const user = useAuth((state) => state.user)
  const [inputName, nameHandler] = useTextField({
    initialValue: user?.fullName ?? '',
  })
  const [inputEmail, emailHandler] = useTextField({
    validator: emailValidator,
    initialValue: user?.email ?? '',
  })
  const [inputPassword, passwordHandler] = useTextField()
  const router = useRouter()

  const submit = async () => {
    const isNameError = nameHandler.checkError()
    const isEmailError = emailHandler.checkError()
    const isPasswordError = passwordHandler.checkError()

    if (isNameError || isEmailError || isPasswordError) {
      console.log('Input error !')
      return
    }

    const payload: UpdateUserBodyRequest = {
      fullName: inputName.value,
      email: inputEmail.value,
      password: inputPassword.value,
    }
    const userId = user?.id ?? ''

    await userService.update(userId, payload)

    console.log('Send request...')
  }

  return (
    <BaseLayout>
      <Head>
        <title>Profile | ApiContact</title>
      </Head>
      <Box
        display="flex"
        justifyContent="space-between"
        style={{ marginTop: '64px' }}
      >
        <Typography variant="h5">Akun Saya</Typography>
        <Typography
          variant="caption"
          color="error"
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => {
            router.push('login')
            userService.logout()
            setUser(undefined)
          }}
        >
          Logout <Logout sx={{ width: '14px', height: '14px', ml: '4px' }} />
        </Typography>
      </Box>
      <TextField
        sx={{ mt: '40px' }}
        fullWidth
        label="Nama"
        onChange={nameHandler.onChange}
        value={inputName.value}
        error={!!inputName.errorMessage}
        errorMessage={inputName.errorMessage}
      />
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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: '40px', mb: '70px' }}
        onClick={submit}
      >
        Simpan
      </Button>
    </BaseLayout>
  )
}

export default ProfilePage
