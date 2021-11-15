import cookie from "cookie";
import {deleteWithHeaders, getWithHeaders} from "../../../components/api/authorizedRequests";

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const auth = cookies.auth
  const {pictureId} = req.query
  if (req.method === 'DELETE') {
    try {
      const resApi = deleteWithHeaders(`${process.env.BackendApiUrl}/picture/${pictureId}`, auth)
      return res.status(resApi.status).send(resApi.data)
    } catch (e) {
      res.status(e.response.status).send(e.response.data)
    }
  } else {
    res.setHeader('Allow', ['DELETE'])
    res.status(405).send(`Method ${req.method} not allowed`)
  }
}