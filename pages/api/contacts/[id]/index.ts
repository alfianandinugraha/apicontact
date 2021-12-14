import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()
  .put((req, res) => {
    return res.json({
      message: 'Update success',
      body: {},
    })
  })
  .delete((req, res) => {
    return res.json({
      message: 'Delete success',
      body: {},
    })
  })

export default handler
