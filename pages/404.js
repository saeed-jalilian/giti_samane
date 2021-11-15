import {Button, Result} from "antd";
import Link from 'next/link'

const Custom404 = () => {
  return (
      <Result
          status='404'
          title='خطای ۴۰۴'
          subTitle='متاسفانه صفحه ی مورد نظر شما موجود نمیباشد'
          style={{direction: 'rtl'}}
          extra={<Link href='/' passHref>
            <Button type='primary' shape={'round'} size='large'>بازگشت به خانه</Button>
          </Link>}
      />
  )
}

export default Custom404;