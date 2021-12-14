const KEY = 'apicontact-token'

const get = () => {
  return localStorage.getItem(KEY)
}

const set = (token: string) => {
  localStorage.setItem(KEY, token)
}

const deleteToken = () => {
  localStorage.removeItem(KEY)
}

const tokenService = {
  set,
  delete: deleteToken,
  get,
}

export default tokenService
