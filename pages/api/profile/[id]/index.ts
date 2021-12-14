import checkToken from '@server/middlewares/checkToken'
import userService from '@server/services/user'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { User } from 'types'

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(checkToken)
  .put(async (req, res) => {
    const user = req.body.userInfo as User
    const { email, password, fullName } = req.body

    const result = await userService.update(user.id, {
      email,
      password,
      fullName,
    })

    return res.json({
      message: 'Success update user data',
      body: result,
    })
  })

export default handler
