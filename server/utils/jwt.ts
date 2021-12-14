import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'

const sign = (payload: object) => {
  return jsonwebtoken.sign(payload, process.env.NEXT_APP_JWT_SECRET_KEY ?? '', {
    expiresIn: '7d',
  })
}

const verify = (token: string) => {
  try {
    const result = jsonwebtoken.verify(
      token,
      process.env.NEXT_APP_JWT_SECRET_KEY ?? ''
    )

    return result
  } catch (err) {
    return undefined
  }
}

const jwt = {
  sign,
  verify,
}

export default jwt
