import jwt from '@server/utils/jwt'
import { firestore } from '@server/vendors/firebase'
import bcrypt from 'bcrypt'
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  setDoc,
} from 'firebase/firestore'
import {
  FirebaseUser,
  RegisterUserPayload,
  UpdateContactPayload,
  UpdateUserPayload,
  User,
} from 'types'

const getUserDocByEmail = async (email: string) => {
  const userCollection = collection(firestore, 'users')
  const userQuery = query(userCollection, where('email', '==', email))

  return await getDocs(userQuery)
}

const findUserById = async (userId: string): Promise<User | undefined> => {
  const userRef = doc(firestore, 'users', userId)
  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) return undefined

  return userDoc.data() as User
}

const findByEmail = async (email: string): Promise<User | undefined> => {
  const userDoc = await getUserDocByEmail(email)

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

const login = async (email: string, password: string) => {
  const userDoc = await getUserDocByEmail(email)

  const user: FirebaseUser | undefined = userDoc.docs.map((doc) => {
    const result = doc.data()
    return {
      id: doc.id,
      email: result.email,
      fullName: result.fullName,
      password: result.password,
    }
  })[0]

  if (!user) return undefined

  const isValid = bcrypt.compareSync(password, user.password)
  if (isValid) {
    return {
      userInfo: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      token: jwt.sign({ userId: user.id }),
    }
  }

  return undefined
}

const update = async (
  userId: string,
  payload: UpdateUserPayload
): Promise<User> => {
  const userRef = doc(firestore, 'users', userId)
  const newPassword = bcrypt.hashSync(payload.password, bcrypt.genSaltSync(4))
  const newPayload = {
    ...payload,
    password: newPassword,
  }

  await setDoc(userRef, newPayload)

  return {
    id: userId,
    email: newPayload.email,
    fullName: newPayload.fullName,
  }
}

const userService = {
  register,
  findByEmail,
  login,
  findUserById,
  update,
}

export default userService
