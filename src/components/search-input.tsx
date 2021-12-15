import useTextField from '@src/hooks/use-text-field'
import TextField from '@src/components/text-field'
import debounce from '@src/utils/debounce'
import React from 'react'

type SearchTextFieldProps = {
  onChangeDebounce?: (value: string) => void
  onChange?: (value: string) => void
}

const debounceSearch = debounce((cb: () => void) => {
  cb()
})

const SearchTextField = (props: SearchTextFieldProps) => {
  const [searchQuery, searchQueryHandler] = useTextField({
    required: false,
  })

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(e.target.value)
    debounceSearch(() => {
      props.onChangeDebounce && props.onChangeDebounce(e.target.value)
    })
    searchQueryHandler.onChange(e)
  }

  return (
    <TextField
      label="Cari kontak disini"
      onChange={change}
      value={searchQuery.value}
    />
  )
}

export default SearchTextField
