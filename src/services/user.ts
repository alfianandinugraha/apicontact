import { httpApi } from '@src/utils/http'
import {
  LoginUserBodyResponse,
  RegisterUserBodyResponse,
  RegisterUserPayload,
} from 'types'
import tokenService from './token'

const register = async (payload: RegisterUserPayload) => {
  const response = await httpApi.post<RegisterUserBodyResponse>(
    '/auth/register',
    payload
  )

  tokenService.set(response.data.body.token)
  return response.data
}

const login = async (email: string, password: string) => {
  const response = await httpApi.post<LoginUserBodyResponse>('/auth/login', {
    email,
    password,
  })

  tokenService.set(response.data.body.token)
  return response.data
}

const logout = () => {
  tokenService.delete()
}

const userService = {
  register,
  logout,
  login,
}

export default userService
