declare module 'types' {
  export type ContactItem = {
    id: string
    contact: string
  }

  export type FirebaseContact = {
    id: string
    userId: string
    fullName: string
    items: ContactItem[]
  }

  export type Contact = FirebaseContact

  export type StoreContactPayload = Omit<FirebaseContact, 'id' | 'items'> & {
    items: string[]
  }

  export type StoreContactBodyRequest = StoreContactPayload

  export type UpdateContactPayload = StoreContactPayload

  export interface HttpResponse<T = {}> {
    message: string
    body: T
  }

  export type FirebaseUser = {
    id: string
    email: string
    fullName: string
    password: string
  }

  export type RegisterUserPayload = Omit<FirebaseUser, 'id'>

  export type User = Omit<FirebaseUser, 'password'>

  export type UpdateUserPayload = Omit<FirebaseUser, 'id'>

  export type RegisterUserBodyResponse = HttpResponse<{
    token: string
    user: User
  }>

  export type LoginUserBodyResponse = RegisterUserBodyResponse

  export type UserProfileBodyResponse = HttpResponse<User>
}
