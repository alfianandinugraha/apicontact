import userService from '@server/services/user'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const { email, password } = req.body

  const user = await userService.login(email, password)

  if (!user) {
    return res.status(400).json({
      message: 'Invalid email / password',
      body: {},
    })
  }

  return res.json({
    message: 'Login successfully',
    body: {
      token: user.token,
      user: {
        id: user.userInfo.id,
        fullName: user.userInfo.fullName,
        email: user.userInfo.email,
      },
    },
  })
})

export default handler
