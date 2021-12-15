import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import muiTheme from '@src/themes/mui'
import { useEffect } from 'react'
import userService from '@src/services/user'
import shallow from 'zustand/shallow'
import useAuth from '@src/stores/user'

function MyApp({ Component, pageProps, router }: AppProps) {
  const { setUser, setIsLoading } = useAuth(
    (state) => ({
      setUser: state.setUser,
      setIsLoading: state.setIsLoading,
    }),
    shallow
  )

  useEffect(() => {
    const getProfile = async () => {
      try {
        const result = await userService.getProfile()
        setUser(result.body)
        setIsLoading(true)
      } catch (err) {
        setUser(undefined)
      } finally {
        setIsLoading(false)
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
