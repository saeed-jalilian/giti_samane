import {ConfigProvider} from 'antd'
import Head from 'next/head'
import {Provider} from 'react-redux'
import {useStore} from '../components/api/redux/store'

import 'antd/dist/antd.css'

import '/styles/css/main.css'

import MainLayout from "../components/layouts/MainLayout";


function MyApp({Component, pageProps}) {

  const store = useStore(pageProps.initial)

  return (
      <MainLayout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </MainLayout>
  )
}

export default MyApp
