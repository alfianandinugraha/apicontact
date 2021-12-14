import checkToken from '@server/middlewares/checkToken'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { User } from 'types'

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(checkToken)
  .get((req, res) => {
    const userInfo: User = req.body.userInfo

    return res.json({
      message: 'Success get all contact',
      body: [],
    })
  })

export default handler
