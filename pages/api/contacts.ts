import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>().get((req, res) => {
  return res.json({
    message: 'Success get all contact',
    body: [],
  })
})

export default handler
