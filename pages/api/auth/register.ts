import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import bcrypt from 'bcrypt'
import userService from '@server/services/user'
import jwt from '@server/utils/jwt'
import { HttpResponse } from 'types'

const handler = nc<NextApiRequest, NextApiResponse<HttpResponse>>().post(
  async (req, res) => {
    const email = req.body.email
    const fullName = req.body.fullName
    const password = req.body.password

    const encryptPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(16))

    const userId = userService.register({
      email,
      fullName,
      password: encryptPassword,
    })

    const token = jwt.sign({ userId })

    return res.json({
      message: 'Register successfully',
      body: {
        token,
      },
    })
  }
)

export default handler
