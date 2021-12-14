import contactService from '@server/services/contact'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

const checkContactId = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const contactId: string = req.query.id as string

  const contact = await contactService.findById(contactId)
  if (!contact) {
    return res.status(404).json({
      message: 'Contact not found',
      body: {},
    })
  }

  req.body = {
    ...req.body,
    contactInfo: contact,
  }
  next()
}

export default checkContactId
