import {ConfigProvider} from 'antd'
import {Provider} from 'react-redux'
import {useStore} from '../components/api/redux/store'

import 'antd/dist/antd.css'

import '/styles/css/main.css'

import MainLayout from "../components/layouts/MainLayout";


function MyApp({Component, pageProps}) {

  const store = useStore(pageProps.initial)

  return (
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
  )
}

export default MyApp
