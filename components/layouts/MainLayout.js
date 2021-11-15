import {useEffect} from "react";
import Head from 'next/head'
import {message} from "antd";
import {LoadingBar} from "react-redux-loading-bar";
import {useDispatch} from "react-redux";
import {SWRConfig} from "swr";
import {useRouter} from "next/router";

import {checkAuthenticated} from "../api/redux/actions/user";
import TopNav from "../common/TopNav";
import {fetcher} from "../api/fetcher";

const MainLayout = ({children}) => {

  message.config({rtl: true})
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(checkAuthenticated())
  }, [dispatch])

  return (
      <SWRConfig value={{
        onError: async (err, key) => {
          if (err.response.status === 403) {
            await router.push('/403')
          } else if (err.response.status === 404) {
            await router.push('/404')
          } else if (err.response.status === 500) {
            await router.push('/500')
          }
        },
        fetcher: fetcher.catch(error => {
          if (error.response.status === 403) {
            router.push('/403')
          } else if (error.response.status === 404) {
            router.push('/404')
          } else {
            router.push('/500')
          }
        })
      }}>
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
      </SWRConfig>
  )
}

export default MainLayout