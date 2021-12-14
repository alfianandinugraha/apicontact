import { addDoc, collection } from '@firebase/firestore'
import { firestore } from '@server/vendors/firebase'
import { nanoid } from 'nanoid'
import { Contact, StoreContactPayload } from 'types'

const store = async (payload: StoreContactPayload): Promise<Contact> => {
  const userCollection = collection(firestore, 'contacts')
  const newItem = payload.items.map((contact) => {
    return {
      id: nanoid(),
      contact,
    }
  })
  const newPayload = {
    ...payload,
    items: newItem,
  }
  const userDoc = await addDoc(userCollection, newPayload)

  return {
    id: userDoc.id,
    ...newPayload,
  }
}

const contactService = {
  store,
}

export default contactService
