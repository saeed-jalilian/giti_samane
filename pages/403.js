import {Button, Result} from "antd";
import Link from 'next/link'
import Head from "next/head";
import {Fragment} from "react";

const Custom403 = () => {
  return (
      <Fragment>
        <Head>
          <title>
            فروشگاه من و مد | خطای ۴۰۳
          </title>
        </Head>
        <Result
            status='403'
            title='خطای ۴۰۳'
            subTitle='متاسفانه شما امکان دسترسی به صفحه ی مورد نظر را ندارید.'
            style={{direction: 'rtl'}}
            extra={<Link href='/' passHref>
              <Button type='primary' shape={'round'} size='large'>بازگشت به خانه</Button>
            </Link>}
        />
      </Fragment>
  )
}

export default Custom403;