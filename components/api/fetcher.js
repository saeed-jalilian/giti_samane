import http from "./axiosConfig";

export const fetcher = (url, auth) => http.get(url, {headers: {'Authorization': `Basic ${auth}`}}).then(res => res.data)

export const fetchWithToken = (url, auth) => http.get(url, {headers: {'Authorization': `Basic ${auth}`}}).then(res => res.data)