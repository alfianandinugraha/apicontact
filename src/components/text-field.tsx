import React from 'react'
import {
  FormGroup,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  Typography,
} from '@mui/material'

type TextFieldProps = MuiTextFieldProps & {
  errorMessage?: string
}

const TextFild = (props: TextFieldProps): React.ReactElement => {
  const { errorMessage, style } = props
  const newProps = { ...props }

  delete newProps.errorMessage

  return (
    <FormGroup style={{ marginBottom: '14px' }}>
      <MuiTextField {...newProps} style={{ ...style, marginBottom: '6px' }} />
      {errorMessage ? (
        <Typography variant="caption" color="error">
          {errorMessage}
        </Typography>
      ) : null}
    </FormGroup>
  )
}

export default TextFild
