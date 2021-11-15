import cookie from "cookie";
import {getWithHeaders} from "../../../../components/api/authorizedRequests";
import * as FormData from 'form-data'
import * as fs from 'fs'
import formidable from 'formidable'
import http from "../../../../components/api/axiosConfig";

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const auth = cookies.auth
  const {albumName} = req.query
  let formData = new FormData()

  if (req.method === 'GET') {
    try {
      const resApi = await getWithHeaders(`${process.env.BackendApiUrl}/album/${albumName}/pictures`, auth)
      return res.status(resApi.status).send(resApi.data)
    } catch (e) {
      return res.status(e.response.status).send(e.response.data)
    }
  } else if (req.method === 'POST') {
    let form = formidable({keepExtensions: true, multiples: true})

    form.parse(req, async (err, fields, files) => {
      const imageFile = fs.readFileSync(files.img.filepath)
      formData.append('title', title, fields.title)
      formData.append('desc', fields.desc)
      formData.append('img', imageFile, {filename: files.img.name, filepath: files.img.filepath})
      const axiosConfig = {
        headers: {
          'Authorization': `Basic ${auth}`,
          ...formData.getHeaders()
        }
      }

      try {
        const resApi = await http.post(`${process.env.BackendApiUrl}/album/${albumName}/pictures`, formData.getBuffer(), axiosConfig)
        return res.status(resApi.status).send(resApi.data)
      } catch (e) {
        return res.status(e.response.status).send(e.response.data)
      }
    })

  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).send(`Method ${req.method} not allowed`)
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}