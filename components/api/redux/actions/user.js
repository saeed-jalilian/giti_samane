import {hideLoading, showLoading} from "react-redux-loading-bar";
import {message} from "antd";
import cookie from 'cookie'

import http from "../../axiosConfig";


export const loginUser = user => async dispatch => {
  dispatch(showLoading())
  const body = {
    username: user.username,
    password: user.password
  }
  try {
    const res = await http.post(`${process.env.BackendApiUrl}/login/`, body)
    const accessCookie = cookie.parse(res.data.cookie)
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: body
    })
    // dispatch(loadUser())
    message.success('ورود موفقیت آمیز بود')
    return res
  } catch (e) {
    dispatch({type: 'LOGIN_FAIL'})
  } finally {
    dispatch(hideLoading())
  }
}


export const registerUser = user => async dispatch => {
  dispatch(showLoading())
  try {
    const res = await http.post(`${process.env.BackendApiUrl}/register/`, user)
    message.success('ثبت نام با موفقیت انجام شد')
    dispatch({type: 'SIGNUP_SUCCESS'})
    return res
  } catch (e) {
    if (e.response) {
      if (e.response.data.username) {
        message.error('کاربری با این شماره نام کاربری قبلا ثبت نام کرده است')
      }
    }
    dispatch({type: 'SIGNUP_FAIL'})
  } finally {
    dispatch(hideLoading())
  }
}