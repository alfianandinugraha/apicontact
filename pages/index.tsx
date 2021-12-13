/* eslint-disable @next/next/no-img-element */
import { GitHub } from '@mui/icons-material'
import { Box, Container, Link, Typography } from '@mui/material'
import { styled } from '@mui/system'
import type { NextPage } from 'next'
import Head from 'next/head'
import materialUiIcon from '@public/material-ui.svg'
import nextjsIcon from '@public/nextjs.svg'
import typescriptIcon from '@public/typescript.svg'
import ButtonLink from '@src/components/ButtonLink'

const ImageBox = styled(Box)(({ theme }) => {
  return {
    '& > img': {
      width: '80px',
      height: '80px',
      '&:not(:last-child)': {
        marginRight: 24,
      },
      [theme.breakpoints.up('md')]: {
        width: '130px',
        height: '130px',
      },
    },
  }
})

const Home: NextPage = () => {
  return (
    <Container style={{ height: '100vh' }}>
      <Head>
        <title>Next-MUI Boilerplate</title>
        <meta
          name="description"
          content="Integrate Nextjs with Material-UI and Typescript"
        />
      </Head>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{ width: '100%', height: '100%' }}
      >
        <ImageBox>
          <img src={materialUiIcon.src} alt="Material UI Icon" />
          <img src={nextjsIcon.src} alt="Material UI Icon" />
          <img src={typescriptIcon.src} alt="Material UI Icon" />
        </ImageBox>
        <Typography
          variant="h4"
          fontWeight="bold"
          style={{ marginTop: 24, marginBottom: 8 }}
        >
          Next-MUI
        </Typography>
        <Typography
          align="center"
          sx={{
            '& > a': {
              fontWeight: 'bold',
              textDecoration: 'none',
            },
          }}
        >
          Integrate{' '}
          <Link href="https://nextjs.org/" target="_blank">
            Nextjs
          </Link>{' '}
          with{' '}
          <Link href="https://mui.com/" target="_blank">
            Material-UI
          </Link>{' '}
          and{' '}
          <Link href="https://www.typescriptlang.org/" target="_blank">
            Typescript
          </Link>
        </Typography>
        <Box style={{ marginTop: 24 }}>
          <ButtonLink
            href="https://github.com/alfianandinugraha/next-mui"
            target="_blank"
            variant="contained"
            startIcon={<GitHub />}
          >
            GitHub
          </ButtonLink>
        </Box>
      </Box>
    </Container>
  )
}

export default Home
