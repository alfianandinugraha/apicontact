import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'
import { NextConnect, NextHandler } from 'next-connect'
import jwt from '@server/utils/jwt'
import userService from '@server/services/user'

const invalidTokenObj = {
  message: 'Invalid token',
  body: {},
}

const checkToken = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const authorizationPayload = req.headers.authorization
  if (!authorizationPayload) return res.status(401).json(invalidTokenObj)

  const token = authorizationPayload.split(' ')[1]
  if (!token) return res.status(401).json(invalidTokenObj)

  const isJwt = validator.isJWT(token)
  if (!isJwt) return res.status(401).json(invalidTokenObj)

  const result = jwt.verify(token) as { userId: string } | undefined
  if (!result) return res.status(401).json(invalidTokenObj)

  const user = await userService.findUserById(result.userId)
  if (!user) return res.status(401).json(invalidTokenObj)

  req.body = {
    ...req.body,
    userInfo: {
      id: result.userId,
      email: user.email,
      fullName: user.fullName,
    },
  }

  next()
}

export default checkToken
