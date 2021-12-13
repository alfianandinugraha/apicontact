import React, { useState } from 'react'
import { inputErrorMessage } from '@src/const/messages'

interface InputProps {
  value: string
  errorMessage?: string
}

interface useTextFieldOption {
  initialValue?: string
  required?: boolean
  validator?: (props: InputProps) => string
}

type DispatchInput = React.Dispatch<React.SetStateAction<InputProps>>

type TextFieldHookType = (props?: useTextFieldOption) => [
  InputProps,
  {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    checkError: () => void
    setInput: DispatchInput
    subscribe: (func: (props: InputProps) => void) => void
  }
]

const useTextField: TextFieldHookType = (props) => {
  const { initialValue, required, validator } = props || {
    initialValue: '',
    required: true,
    validator: () => '',
  }
  const [input, setInput] = useState<InputProps>({ value: initialValue ?? '' })

  const checkError = () => {
    if (input.errorMessage) {
      setInput(input)
      return
    }

    setInput({
      ...input,
      errorMessage: input.value ? '' : inputErrorMessage.EMPTY,
    })
  }

  const subscribe = (func: (props: InputProps) => void) => {
    func(input)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (validator) {
      setInput({
        value,
        errorMessage: value ? validator({ value }) : inputErrorMessage.EMPTY,
      })
      return
    }

    if (required) {
      setInput({
        value: value,
        errorMessage: value ? '' : inputErrorMessage.EMPTY,
      })
      return
    }

    setInput({
      value: value,
    })
  }

  const handler = {
    onChange,
    setInput,
    checkError,
    subscribe,
  }

  return [input, handler]
}

export default useTextField
