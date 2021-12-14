import jsonwebtoken from 'jsonwebtoken'

const sign = (payload: object) => {
  return jsonwebtoken.sign(payload, process.env.NEXT_APP_JWT_SECRET_KEY ?? '', {
    expiresIn: '7d',
  })
}

const jwt = {
  sign,
}

export default jwt
