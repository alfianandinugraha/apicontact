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

const getById = async (contactId: string) => {
  const response = await httpApiProtected.get<HttpResponse<Contact>>(
    `/contacts/${contactId}`
  )
  return response.data
}

const deleteContact = async (contactId: string) => {
  const response = await httpApiProtected.delete<HttpResponse>(
    `/contacts/${contactId}`
  )
  return response.data
}

const contactService = {
  store,
  getAll,
  getById,
  delete: deleteContact,
}

export default contactService
