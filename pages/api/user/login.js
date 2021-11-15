import cookie from "cookie";
import * as btoa from 'btoa'

import http from "../../../components/api/axiosConfig";

export default async (req, res) => {
  if (req.method === 'POST') {
    const {username, password} = req.body
    const codedAuth = btoa(`${username}:${password}`)
    const resApi = await http.post(`${process.env.BackendApiUrl}/login`, req.body)

    res.setHeader('Set-Cookie', [
      cookie.serialize(
          'auth', codedAuth, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24 * 30,
            sameSite: 'strict',
            path: `/api/`
          }
      )
    ])

    res.status(resApi.status).send(resApi.data)
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).send(`Method ${req.method} not allowed`)
  }
}