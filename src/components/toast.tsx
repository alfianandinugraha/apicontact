import React from 'react'
import { Typography } from '@mui/material'

type ToastProps = {
  children?: React.ReactNode
}

const Toast = (props: ToastProps) => {
  return (
    <Typography color="black">
      {props.children ?? 'Terjadi kesalahan'}
    </Typography>
  )
}

export default Toast
