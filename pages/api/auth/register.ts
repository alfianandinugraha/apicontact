import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import bcrypt from 'bcrypt'
import userService from '@server/services/user'
import jwt from '@server/utils/jwt'
import { HttpResponse } from 'types'

const handler = nc<NextApiRequest, NextApiResponse<HttpResponse>>().post(
  async (req, res) => {
    console.log('register user...')
    const email = req.body.email
    const fullName = req.body.fullName
    const password = req.body.password

    const findUser = await userService.findByEmail(email)

    if (findUser) {
      console.log('User was registered...')
      return res.status(400).json({
        message: 'Email was registered',
        body: {},
      })
    }

    const encryptPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(4))

    const user = await userService.register({
      email,
      fullName,
      password: encryptPassword,
    })

    const token = jwt.sign({ userId: user.id })

    console.log('Register user successfully')
    return res.json({
      message: 'Register successfully',
      body: {
        token,
        user,
      },
    })
  }
)

export default handler
