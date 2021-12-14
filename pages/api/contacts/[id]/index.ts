import checkContactId from '@server/middlewares/checkContactId'
import checkToken from '@server/middlewares/checkToken'
import contactService from '@server/services/contact'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { FirebaseContact } from 'types'

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(checkToken)
  .use(checkContactId)
  .put(async (req, res) => {
    const contact: FirebaseContact = req.body.contactInfo
    const user: FirebaseContact = req.body.userInfo
    const { fullName, items }: { fullName: string; items: string[] } = req.body

    const newContact = await contactService.update(contact.id, {
      userId: user.id,
      fullName,
      items,
    })

    return res.json({
      message: 'Update success',
      body: newContact,
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
