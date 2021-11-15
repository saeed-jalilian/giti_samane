import {useEffect} from "react";
import {connect} from "react-redux";
import Head from 'next/head'
import {message} from "antd";
import {LoadingBar} from "react-redux-loading-bar";
import {useDispatch} from "react-redux";

import {checkAuthenticated} from "../api/redux/actions/user";
import TopNav from "../common/TopNav";

const MainLayout = ({children}) => {

  message.config({rtl: true})
  const dispatch = useDispatch()

  useEffect(() => {
    const authenticate = async () => {
      await dispatch(checkAuthenticated())
    }
    authenticate()
  }, [dispatch, checkAuthenticated])

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

export default MainLayout