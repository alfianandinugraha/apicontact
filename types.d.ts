declare module 'types' {
  export type Contact = {
    id: string
    userId: string
    fullName: string
    items: { id: string; contact: string }[]
  }
}
