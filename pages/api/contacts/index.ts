import checkToken from '@server/middlewares/checkToken'
import contactService from '@server/services/contact'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { User } from 'types'

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
  .post(async (req, res) => {
    const userInfo: User = req.body.userInfo
    const { fullName, items }: { fullName: string; items: string[] } = req.body

    const resultContact = await contactService.store({
      items,
      fullName,
      userId: userInfo.id,
    })

    return res.json({
      message: 'Saved',
      body: resultContact,
    })
  })

export default handler
