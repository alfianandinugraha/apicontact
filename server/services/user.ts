import { firestore } from '@server/vendors/firebase'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { RegisterUserPayload, User } from 'types'

const findByEmail = async (email: string): Promise<User | undefined> => {
  const userCollection = collection(firestore, 'users')
  const userQuery = query(userCollection, where('email', '==', email))

  const userDoc = await getDocs(userQuery)

  const user: User | undefined = userDoc.docs.map((doc) => {
    const result = doc.data()
    return {
      id: doc.id,
      fullName: result.fullName,
      email: result.email,
    }
  })[0]

  return user
}

const register = async (payload: RegisterUserPayload): Promise<User> => {
  const userCollection = collection(firestore, 'users')
  const userDoc = await addDoc(userCollection, payload)

  return {
    id: userDoc.id,
    fullName: payload.fullName,
    email: payload.email,
  }
}

const userService = {
  register,
  findByEmail,
}

export default userService
