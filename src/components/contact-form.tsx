import { Add, Close } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import TextField from '@src/components/text-field'
import useTextField from '@src/hooks/use-text-field'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'

type InputArrayItemProps = {
  id: string
  value: string
  errorMessage: string
}

type ContactFormPayload = {
  fullName: string
  contacts: InputArrayItemProps[]
}

type ContactFormProps = {
  variant: 'ADD' | 'EDIT'
  onSubmit: (payload: ContactFormPayload) => void
}

const ContactForm = (props: ContactFormProps) => {
  const [inputName, nameHandler] = useTextField()
  const [listContact, setListContact] = useState<InputArrayItemProps[]>([
    {
      id: nanoid(),
      value: '',
      errorMessage: '',
    },
  ])

  const submit = () => {
    const isNameError = nameHandler.checkError()

    if (isNameError) {
      console.log('Input error !')
      return
    }

    props.onSubmit({
      fullName: inputName.value,
      contacts: listContact,
    })
  }

  return (
    <Box>
      <TextField
        label="Nama"
        value={inputName.value}
        onChange={nameHandler.onChange}
        error={!!inputName.errorMessage}
        errorMessage={inputName.errorMessage}
      />
      {listContact.map((item, idx) => {
        return (
          <TextField
            label="Telepon"
            type="tel"
            key={item.id}
            value={item.value}
            endIcon={
              listContact.length > 1 ? (
                <Close
                  sx={{ color: '#808080' }}
                  onClick={() => {
                    const newListContact = listContact.filter(
                      (val) => val.id !== item.id
                    )
                    setListContact(newListContact)
                  }}
                />
              ) : null
            }
            onChange={(e) => {
              const value = e.target.value
              const newListContact = [...listContact]
              newListContact[idx].value = value
              setListContact(newListContact)
            }}
          />
        )
      })}

      <Button
        fullWidth
        sx={{ border: '1px dashed #808080', color: '#808080', mb: '40px' }}
        startIcon={<Add />}
        onClick={() => {
          setListContact([
            ...listContact,
            {
              id: nanoid(),
              value: '',
              errorMessage: '',
            },
          ])
        }}
      >
        Tambah Telepon Lagi
      </Button>
      <Button fullWidth color="primary" variant="contained" onClick={submit}>
        {props.variant === 'ADD' ? 'Tambah' : 'Simpan'}
      </Button>
    </Box>
  )
}

export default ContactForm
