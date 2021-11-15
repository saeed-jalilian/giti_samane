import cookie from "cookie";
import {deleteWithHeaders, getWithHeaders} from "../../../../components/api/authorizedRequests";

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const auth = cookies.auth
  const {albumName} = req.query
  if (req.method === 'GET') {
    try {
      const resApi = await getWithHeaders(`${process.env.BackendApiUrl}/album/${albumName}`, auth)
      return res.status(resApi.status).send(resApi.data)
    } catch (e) {
      res.status(e.response.status).send(e.response.data)
    }
  } else if (req.method === 'DELETE') {
    try {
      const resApi = await deleteWithHeaders(`${process.env.BackendApiUrl}/album/${albumName}`, auth)
      return res.status(resApi.status).send(resApi.data)
    } catch (e) {
      return res.status(e.response.status).send(e.response.data)
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE'])
    res.status(405).send(`Method ${req.method} not allowed`)
  }
}