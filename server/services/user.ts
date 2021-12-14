import { firestore } from '@server/vendors/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { RegisterUserPayload } from 'types'

const register = async (payload: RegisterUserPayload) => {
  const userCollection = collection(firestore, 'users')
  const userDoc = await addDoc(userCollection, payload)

  return userDoc.id
}

const userService = {
  register,
}

export default userService
