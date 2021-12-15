import ajv from '@server/utils/ajv'
import { JSONSchemaType } from 'ajv'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

function requireBody<T>(schema: JSONSchemaType<T>) {
  return (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const validate = ajv.compile(schema)
    const isValid = validate(req.body)

    if (isValid) {
      next()
    } else {
      return res.status(400).json({
        message: 'Harap isi data dengan benar',
        body: {},
      })
    }
  }
}

export default requireBody
