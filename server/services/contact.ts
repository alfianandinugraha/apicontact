import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from '@firebase/firestore'
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
  const contacts: FirebaseContact[] = contactDocs.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  }) as FirebaseContact[]

  return contacts
}

const findById = async (contactId: string) => {
  const userRef = doc(firestore, 'contacts', contactId)
  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) return undefined
  const result = userDoc.data() as FirebaseContact
  return {
    ...result,
    id: userDoc.id,
  }
}

const contactService = {
  store,
  getAll,
  findById,
}

export default contactService
