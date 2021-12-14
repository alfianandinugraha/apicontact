declare module 'types' {
  export type Contact = {
    id: string
    userId: string
    fullName: string
    items: { id: string; contact: string }[]
  }

  export type FirebaseUser = {
    id: string
    email: string
    fullName: string
    password: string
  }

  export type RegisterUserPayload = Omit<FirebaseUser, 'id'>
}
