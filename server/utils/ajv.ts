import Ajv from 'ajv'
import validator from 'validator'

const ajv = new Ajv()
ajv.addKeyword({
  keyword: 'variant',
  compile: () => {
    return (data) => {
      return validator.isEmail(data)
    }
  },
})

export default ajv
