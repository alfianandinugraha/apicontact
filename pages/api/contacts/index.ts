import checkToken from '@server/middlewares/checkToken'
import requireBody from '@server/middlewares/requireBody'
import { storeContactBodySchema } from '@server/schemas/contactRequest'
import contactService from '@server/services/contact'
import { JSONSchemaType } from 'ajv'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { StoreContactBodyRequest, User } from 'types'
import validator from 'validator'

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(checkToken)
  .get(async (req, res) => {
    const userInfo: User = req.body.userInfo
    const contacts = await contactService.getAll(userInfo.id)

    let searchQuery = req.query.q ?? ''

    if (searchQuery) {
      let keyword = searchQuery.toString()
      const filteredContacts = contacts.filter((item) =>
        item.fullName.toLocaleLowerCase().includes(keyword)
      )
      return res.json({
        message: 'Success get all contact',
        body: filteredContacts,
      })
    }
    return res.json({
      message: 'Success get all contact',
      body: contacts,
    })
  })
  .post(requireBody(storeContactBodySchema), async (req, res) => {
    const { fullName, items }: { fullName: string; items: string[] } = req.body
    const isValidPhone = items.every((item) => validator.isMobilePhone(item))

    if (!isValidPhone) {
      return res.status(400).json({
        message: 'Harap masukkan data dengan benar',
        body: {},
      })
    }

    const userInfo: User = req.body.userInfo

    const resultContact = await contactService.store({
      items,
      fullName,
      userId: userInfo.id,
    })

    return res.json({
      message: 'Saved',
      body: {},
    })
  })

export default handler
