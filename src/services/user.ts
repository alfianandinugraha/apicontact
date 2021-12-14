import { httpApi } from '@src/utils/http'
import { RegisterUserBodyResponse, RegisterUserPayload } from 'types'
import tokenService from './token'

const register = async (payload: RegisterUserPayload) => {
  const response = await httpApi.post<RegisterUserBodyResponse>(
    '/auth/register',
    payload
  )

  tokenService.set(response.data.body.token)
  return response.data
}

const logout = () => {
  tokenService.delete()
}

const userService = {
  register,
  logout,
}

export default userService
