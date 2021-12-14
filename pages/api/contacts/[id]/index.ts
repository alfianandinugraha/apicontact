import checkContactId from '@server/middlewares/checkContactId'
import checkToken from '@server/middlewares/checkToken'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(checkToken)
  .use(checkContactId)
  .put((req, res) => {
    return res.json({
      message: 'Update success',
      body: {},
    })
  })
  .delete((req, res) => {
    console.log(req.body)
    return res.json({
      message: 'Delete success',
      body: {},
    })
  })

export default handler
