import cookie from "cookie";
import {deleteWithHeaders, getWithHeaders} from "../../../components/api/authorizedRequests";
import * as fs from "fs";
import * as FormData from 'form-data'
import formidable from 'formidable'
import http from "../../../components/api/axiosConfig";

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const auth = cookies.auth
  const {pictureId} = req.query
  let formData = new FormData()

  if (req.method === 'GET') {
    try {
      const resApi = await getWithHeaders(`${process.env.BackendApiUrl}/picture/${pictureId}`)
      return res.status(resApi.status).send(resApi.data)
    } catch (e) {
      return res.status(e.response.status).send(e.response.data)
    }
  } else if (req.method === 'DELETE') {
    try {
      const resApi = deleteWithHeaders(`${process.env.BackendApiUrl}/picture/${pictureId}`, auth)
      return res.status(resApi.status).send(resApi.data)
    } catch (e) {
      return res.status(e.response.status).send(e.response.data)
    }
  } else if (req.method === 'PATCH') {
    let form = formidable({keepExtensions: true, multiples: true})

    form.parse(req, async (err, fields, files) => {
      if (fields.title) {
        formData.append('title', fields.title)
      }
      if (fields.desc) {
        formData.append('desc', fields.desc)
      }
      if (files.img) {
        const imageFile = fs.readFileSync(files.img.filepath)
        formData.append('img', imageFile, {filename: files.img.name, filepath: files.img.filepath})
      }

      const config = {
        headers: {
          'Authorization': `Basic ${auth}`,
          ...formData.getHeaders()
        }
      }
      try {
        const resApi = await http.patch(`${process.env.BackendApiUrl}/picture/${pictureId}`, formData.getBuffer(), config)
        return res.status(resApi.status).send(resApi.data)
      } catch (e) {
        return res.status(e.response.status).send(e.response.data)
      }
    })

  } else {
    res.setHeader('Allow', ['DELETE'])
    res.status(405).send(`Method ${req.method} not allowed`)
  }
}


export const config = {
  api: {
    bodyParser: false
  }
}