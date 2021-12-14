import { httpApiProtected } from '@src/utils/http'
import { Contact, HttpResponse, StoreContactBodyRequest } from 'types'

const store = async (payload: StoreContactBodyRequest) => {
  await httpApiProtected.post('/contacts', payload)
}

const getAll = async () => {
  const response = await httpApiProtected.get<HttpResponse<Contact[]>>(
    '/contacts'
  )
  return response.data
}

const contactService = {
  store,
  getAll,
}

export default contactService
