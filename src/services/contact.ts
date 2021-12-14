import { httpApiProtected } from '@src/utils/http'
import { StoreContactBodyRequest } from 'types'

const store = async (payload: StoreContactBodyRequest) => {
  await httpApiProtected.post('/contacts', payload)
}

const contactService = {
  store,
}

export default contactService
