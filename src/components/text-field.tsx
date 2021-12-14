import React from 'react'
import {
  FormGroup,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  Typography,
} from '@mui/material'

type TextFieldProps = MuiTextFieldProps & {
  errorMessage?: string
  endIcon?: React.ReactNode
}

const TextFild = (props: TextFieldProps): React.ReactElement => {
  const { errorMessage, style } = props
  const newProps = { ...props }

  delete newProps.errorMessage
  delete newProps.endIcon

  return (
    <FormGroup style={{ marginBottom: '14px', position: 'relative' }}>
      <MuiTextField {...newProps} style={{ ...style, marginBottom: '6px' }} />
      {props.endIcon ? (
        <div
          style={{
            position: 'absolute',
            right: '10px',
            top: '16px',
            cursor: 'pointer',
          }}
        >
          {props.endIcon}
        </div>
      ) : null}
      {errorMessage ? (
        <Typography variant="caption" color="error">
          {errorMessage}
        </Typography>
      ) : null}
    </FormGroup>
  )
}

export default TextFild
