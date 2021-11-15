import {Result} from "antd";
import Head from "next/head";
import {Fragment} from "react";

const Custom500 = () => {
  return (
      <Fragment>
        <Head>
          <title>
            فروشگاه من و مد | خطای ۵۰۰
          </title>
        </Head>
        <Result
            status='500'
            title='خطای ۵۰۰'
            subTitle='متاسفانه در برقراری با سرور مشکلی بوجود آمده، لطفا مجددا تلاش کنید.'
            style={{direction: 'rtl'}}
        />
      </Fragment>
  )
}

export default Custom500;