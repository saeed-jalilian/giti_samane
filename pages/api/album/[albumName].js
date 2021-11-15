import cookie from "cookie";
import {getWithHeaders} from "../../../components/api/authorizedRequests";

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const auth = cookies.auth
  const {albumName} = req.query
  if (req.method === 'GET') {
    try {
      const resApi = getWithHeaders(`${process.env.BackendApiUrl}/album/${albumName}`, auth)
      return res.status(resApi.status).send(resApi.data)
    } catch (e) {
      res.status(e.response.status).send(e.response.data)
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).send(`Method ${req.method} not allowed`)
  }
}