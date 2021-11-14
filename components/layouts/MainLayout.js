import {Fragment} from "react";
import Head from 'next/head'
import {message} from "antd";
import {LoadingBar} from "react-redux-loading-bar";

import TopNav from "../common/TopNav";

const MainLayout = ({children}) => {

  message.config({rtl: true})

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