import {useEffect} from "react";
import {connect} from "react-redux";
import Head from 'next/head'
import {message} from "antd";
import {LoadingBar} from "react-redux-loading-bar";

import {checkAuthenticated} from "../api/redux/actions/user";
import TopNav from "../common/TopNav";

const MainLayout = ({children, checkAuthenticated}) => {

  message.config({rtl: true})

  useEffect(() => {
    const authenticate = async dispatch => {
      await dispatch(checkAuthenticated())
    }
    authenticate()
  }, [])

  return (
      <div className='container'>
        <Head>
          <title>
            خانه
          </title>
        </Head>

        <LoadingBar/>

        <TopNav/>


        {children}

      </div>
  )
}

export default connect(null, {checkAuthenticated})(MainLayout)