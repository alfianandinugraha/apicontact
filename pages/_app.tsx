import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import muiTheme from '@src/themes/mui'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={muiTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
