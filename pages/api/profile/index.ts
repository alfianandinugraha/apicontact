import checkToken from '@server/middlewares/checkToken'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(checkToken)
  .get((req, res) => {
    const user = req.body.userInfo

    return res.json({
      message: 'Success get user data',
      body: user,
    })
  })

export default handler
