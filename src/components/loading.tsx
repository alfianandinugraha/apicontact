import { Box, BoxProps, CircularProgress, Typography } from '@mui/material'
import React from 'react'

type LoadingProps = BoxProps & {
  label?: string
}

const Loading = (props: LoadingProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      sx={{ marginTop: '2rem' }}
      {...props}
    >
      <CircularProgress />
      <Typography variant="caption" sx={{ mt: '1rem' }}>
        {props.label ?? 'Memuat data'}
      </Typography>
    </Box>
  )
}

export default Loading
