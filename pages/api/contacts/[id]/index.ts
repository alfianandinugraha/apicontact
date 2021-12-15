import checkContactId from '@server/middlewares/checkContactId'
import checkToken from '@server/middlewares/checkToken'
import requireBody from '@server/middlewares/requireBody'
import { storeContactBodySchema } from '@server/schemas/contactRequest'
import contactService from '@server/services/contact'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { FirebaseContact } from 'types'
import validator from 'validator'

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(checkToken)
  .use(checkContactId)
  .get((req, res) => {
    return res.json({
      message: 'Get contact success',
      body: req.body.contactInfo,
    })
  })
  .put(requireBody(storeContactBodySchema), async (req, res) => {
    const { fullName, items }: { fullName: string; items: string[] } = req.body
    const isValidPhone = items.every((item) => validator.isMobilePhone(item))

    if (!isValidPhone) {
      return res.status(400).json({
        message: 'Harap masukkan data dengan benar',
        body: {},
      })
    }

    const contact: FirebaseContact = req.body.contactInfo
    const user: FirebaseContact = req.body.userInfo

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
