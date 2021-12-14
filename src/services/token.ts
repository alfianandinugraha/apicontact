const KEY = 'apicontact-token'

const set = (token: string) => {
  localStorage.setItem(KEY, token)
}

const deleteToken = () => {
  localStorage.removeItem(KEY)
}

const tokenService = {
  set,
  delete: deleteToken,
}

export default tokenService
