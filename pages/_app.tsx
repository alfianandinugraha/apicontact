import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import muiTheme from '@src/themes/mui'
import { useEffect, useState } from 'react'
import userService from '@src/services/user'
import shallow from 'zustand/shallow'
import useAuth from '@src/stores/user'

function MyApp({ Component, pageProps, router }: AppProps) {
  const auth = useAuth((state) => state, shallow)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const result = await userService.getProfile()
        auth.setUser(result.body)
      } catch (err) {
        auth.setUser(undefined)
      }
    }

    getProfile()
  }, [router.pathname])

  return (
    <ThemeProvider theme={muiTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
