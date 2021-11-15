import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      res.setHeader('Set-Cookie', [
        cookie.serialize(
            'auth', req.body, {
              httpOnly: true,
              secure: false,
              maxAge: 60 * 60 * 24 * 30,
              sameSite: 'strict',
              path: `/api/`
            }
        )
      ])
    } catch (e) {
      return e
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).send(`Method ${req.method} not allowed`)
  }
}