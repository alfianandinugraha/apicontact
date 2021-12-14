import checkContactId from '@server/middlewares/checkContactId'
import checkToken from '@server/middlewares/checkToken'
import contactService from '@server/services/contact'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { FirebaseContact } from 'types'

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(checkToken)
  .use(checkContactId)
  .put((req, res) => {
    return res.json({
      message: 'Update success',
      body: {},
    })
  })
  .delete(async (req, res) => {
    const contact: FirebaseContact = req.body.contactInfo
    await contactService.delete(contact.id)

    return res.json({
      message: 'Delete success',
      body: {},
    })
  })

export default handler
