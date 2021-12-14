import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>().post((req, res) => {
  return res.json({
    message: 'Login successfully',
    body: {
      token: '',
    },
  })
})

export default handler
