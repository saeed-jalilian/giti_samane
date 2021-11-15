import {hideLoading, showLoading} from "react-redux-loading-bar";
import {message} from "antd";

import http from "../../axiosConfig";


export const loginUser = user => async dispatch => {
  dispatch(showLoading())
  const body = {
    username: user.username,
    password: user.password
  }
  try {
    await http.post(`${process.env.NextUrl}/api/user/login`, body)
    const decodedBtoa = btoa(`${body.username}:${body.password}`)
    await http.post(`${process.env.NextUrl}/api/user/auth`, {auth: decodedBtoa})
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: body.username
    })
    dispatch({
      type: 'SET_AUTH',
      payload: decodedBtoa
    })
    // dispatch(loadUser())
    message.success('ورود موفقیت آمیز بود')
  } catch (e) {
    dispatch({type: 'LOGIN_FAIL'})
  } finally {
    dispatch(hideLoading())
  }
}


export const registerUser = user => async dispatch => {
  dispatch(showLoading())
  try {
    const res = await http.post(`${process.env.BackendApiUrl}/register`, user)
    message.success('ثبت نام با موفقیت انجام شد')
    dispatch({type: 'SIGNUP_SUCCESS'})
    return res
  } catch (e) {
    if (e.response) {
      if (e.response.data.username) {
        message.error('کاربری با این نام کاربری قبلا ثبت نام کرده است')
      }
    }
    dispatch({type: 'SIGNUP_FAIL'})
  } finally {
    dispatch(hideLoading())
  }
}

export const checkAuthenticated = () => async dispatch => {
  dispatch(showLoading())
  try {
    const {data} = await http.get(`${process.env.NextUrl}/api/user/check`)
    dispatch({
      type: 'AUTHENTICATED_SUCCESS',
      payload: data
    })
  } catch (e) {
    dispatch({
      type: 'AUTHENTICATED_FAIL'
    })
  } finally {
    dispatch(hideLoading())
  }
}