import cookie from 'cookie'
import {getWithHeaders, postWithHeaders} from "../../../components/api/authorizedRequests";

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const auth = cookies.auth
  console.log(auth)
  if (req.method === 'GET') {
    try {
      const resApi = await getWithHeaders(`${process.env.BackendApiUrl}/albums`, auth)
      return res.status(resApi.status).send(resApi.data)
    } catch (e) {
      return res.status(e.response.status).send(e.response.data)
    }
  } else if (req.method === 'POST') {
    try {
      const resApi = await postWithHeaders(`${process.env.BackendApiUrl}/albums`, req.body, auth)
      return res.status(resApi.status).send(resApi.data)
    } catch (e) {
      return res.status(e.response.status).send(e.response.data)
    }
  } else {
    res.setHeader('Allow', ['GET'])
  }
}