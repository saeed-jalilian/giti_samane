import http from "./axiosConfig";
import Router from 'next/router'

export const fetcher = (url, auth) => http.get(url, {headers: {'Authorization': `Basic ${auth}`}})
    .then(res => res.data)
    .catch(error => {
      if (error.response.status === 403) {
        Router.push('/403')
      } else if (error.response.status === 404) {
        Router.push('/404')
      } else {
        Router.push('/500')
      }
    })

export const fetchWithToken = (url, auth) => http.get(url, {headers: {'Authorization': `Basic ${auth}`}}).then(res => res.data)