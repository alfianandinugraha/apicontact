import { addDoc, collection, getDocs, query, where } from '@firebase/firestore'
import { firestore } from '@server/vendors/firebase'
import { nanoid } from 'nanoid'
import { Contact, FirebaseContact, StoreContactPayload } from 'types'

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

const getAll = async (userId: string) => {
  const contactCollection = collection(firestore, 'contacts')
  const contactQuery = query(contactCollection, where('userId', '==', userId))

  const contactDocs = await getDocs(contactQuery)
  const contacts: FirebaseContact[] = contactDocs.docs.map((doc) =>
    doc.data()
  ) as FirebaseContact[]

  return contacts
}

const contactService = {
  store,
  getAll,
}

export default contactService
