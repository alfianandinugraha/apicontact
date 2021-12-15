import { httpApi, httpApiProtected } from '@src/utils/http'
import {
  HttpResponse,
  LoginUserBodyResponse,
  RegisterUserBodyResponse,
  RegisterUserPayload,
  UpdateUserBodyRequest,
  User,
  UserProfileBodyResponse,
} from 'types'
import tokenService from './token'

const getProfile = async () => {
  const response = await httpApiProtected.get<UserProfileBodyResponse>(
    '/profile'
  )

  return response.data
}

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

const update = async (userId: string, payload: UpdateUserBodyRequest) => {
  const result = await httpApiProtected.put<HttpResponse<User>>(
    `/profile/${userId}`,
    payload
  )

  return result.data
}

const logout = () => {
  tokenService.delete()
}

const userService = {
  register,
  logout,
  login,
  getProfile,
  update,
}

export default userService
