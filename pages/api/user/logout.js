import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'GET') {
    res.setHeader('Set-Cookie', [
      cookie.serialize(
          'auth', '', {
            httpOnly: true,
            secure: false,
            maxAge: new Date(0),
            sameSite: 'strict',
            path: `/api/`
          }
      ),
      cookie.serialize(
          'main', '', {
            httpOnly: false,
            secure: false,
            maxAge: new Date(0),
            sameSite: 'strict',
            path: `/`
          }
      )]
    )
    return res.status(200).json({
      success: 'Logged out successfully'
    })
  } else {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({
      error: `Method ${req.method} not allowed`
    })
  }
}