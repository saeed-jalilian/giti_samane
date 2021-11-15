import cookie from "cookie"
import atob from 'atob'

import http from "../../../components/api/axiosConfig";

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const auth = cookies.auth
  if (req.method === 'GET') {
    try {
      const decodedAuth = atob(auth)
      const user = decodedAuth.split(':')[0]
      const body = {username: user[0], password: user[1]}
      await http.post(`${process.env.BackendApiUrl}/login`, body)
      res.status(200).send({auth, user})
    } catch (e) {
      res.status(e.response.status).send(e.response.data)
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).send(`Method ${req.method} not allowed`)
  }
}