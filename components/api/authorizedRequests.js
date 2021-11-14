import http from "./axiosConfig";

export const postWithHeaders = async (url, body, auth) => {
  try {
    const config = {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    }
    const res = await http.post(url, body, config)
    return res
  } catch (e) {
    return e
  }
}

export const putWithHeaders = async (url, body, auth) => {
  try {
    const config = {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    }
    const res = await http.put(url, body, config)
    return res
  } catch (e) {
    return e
  }
}

export const patchWithHeaders = async (url, body, auth) => {
  try {
    const config = {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    }
    const res = await http.patch(url, body, config)
    return res
  } catch (e) {
    return e
  }
}

export const getWithHeaders = async (url, auth) => {
  try {
    const config = {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    }
    const res = await http.get(url, config)
    return res
  } catch (e) {
    return e
  }
}

export const deleteWithHeaders = async (url, auth) => {
  try {
    const config = {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    }
    const res = await http.delete(url, config)
    return res
  } catch (e) {
    return e
  }
}

