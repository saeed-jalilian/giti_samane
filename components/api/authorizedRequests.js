import http from "./axiosConfig";
import btoa from 'btoa'

export const postWithHeaders = async (url, body, user, password) => {
  try {
    const decodedUserInfo = btoa()
    const axiosConfig = {

    }
    await http.post(url)
  } catch (e) {
    return e
  }
}