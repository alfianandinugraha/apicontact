import { JSONSchemaType } from 'ajv'
import { StoreContactBodyRequest } from 'types'

const storeContactBodySchema: JSONSchemaType<StoreContactBodyRequest> = {
  type: 'object',
  properties: {
    fullName: {
      type: 'string',
    },
    items: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['fullName', 'items'],
}

export { storeContactBodySchema }
