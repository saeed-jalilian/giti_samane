import {Row, Col, Form, Input, Typography, Button, message} from 'antd'
import cookie from "cookie";
import {fetcher} from "../../components/api/fetcher";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import useSWR from "swr";
import CustomImage from "../../components/common/CustomImage";
import {useDispatch} from "react-redux";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import http from "../../components/api/axiosConfig";

const SinglePicturePage = ({initPicture, pictureId}) => {

  const {Text, Title} = Typography
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    data: pictureData,
    mutate
  } = useSWR(`${process.env.NextUrl}/api/picture/${pictureId}`, {fallbackData: initPicture})

  const [pictureForm] = Form.useForm()
  const [title, setTitle] = useState(false)
  const [desc, setDesc] = useState(false)
  const [img, setImg] = useState(false)

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  const handlePictureEdit = async () => {
    dispatch(showLoading())
    let formData = new FormData()
    try {
      if (title) {
        formData.append('title', title)
      }
      if (desc) {
        formData.append('desc', desc)
      }
      if (img) {
        formData.append('img', img, img.name)
      }
      await http.patch(`${process.env.NextUrl}/picture/${pictureId}`, formData)
      await mutate()
      message.success('تغییرات با موفقیت اعمال شد')
    } catch (e) {
      message.error('متاسفانه با خطایی مواجه شدیم، لطفا مجددا تلاش کنید')
    } finally {
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!isAuthenticated) {
        await router.push(`${process.env.NextUrl}/403`)
      }
      checkLoggedIn()
    }
  }, [isAuthenticated, router])

  return (
      <Row align='middle' justify='space-around'>
        <Col span={24}>
          <Title level={2} style={{textAlign: 'center'}}>
            {pictureData.title}
          </Title>
        </Col>
        <Col span={8}>
          <Form
              form={pictureForm}
              labelCol={6}
              wrapperCol={18}
              className='modal-form'
              onFinish={handlePictureEdit}
          >
            <Form.Item
                label='عنوان'
                name='title'
                rules={[
                  {
                    required: true,
                    message: 'عنوان باید وارد شود'
                  }
                ]}
            >
              <Input
                  onChange={e => setTitle(e.target.value)}
                  placeholder='عنوان عکس را وارد کنید'
                  defaultValue={pictureData.title}
              />
            </Form.Item>

            <Form.Item
                label='شرح'
                name='desc'
                rules={[
                  {
                    required: true,
                    message: 'شرح باید وارد شود'
                  }
                ]}
            >
              <Input
                  onChange={e => setDesc(e.target.value)}
                  placeholder='شرح عکس را وارد کنید'
                  defaultValue={pictureData.desc}
              />
            </Form.Item>

            <Form.Item
                label='تصویر'
                name='img'
                rules={[
                  {
                    required: true,
                    message: 'تصویر باید انتخاب شود'
                  }
                ]}
            >
              <Input
                  type='file'
                  accept='image/*'
                  onChange={e => setImg(e.target.files[0])}
              />
            </Form.Item>

            <Form.Item>
              <Button
                  htmlType='submit'
                  type='primary'
              >
                ثبت
              </Button>
            </Form.Item>


          </Form>
        </Col>

        <Col span={12}>
          <CustomImage
              width={300}
              height={300}
              alt={pictureData.desc}
              src={pictureData.img}
              layout='fixed'
          />
        </Col>
      </Row>
  )
}

export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie)
  const auth = cookies.main
  const {pictureId} = context.params

  try {
    const initPicture = await fetcher(`${process.env.BackendApiUrl}/picture/${pictureId}`, auth)

    return {
      props: {
        initPicture,
        pictureId
      }
    }
  } catch (e) {
    if (e.response.status === 403) {
      return {
        redirect: {
          destination: '/user/login',
          permanent: false
        }
      }
    } else if (e.response.status === 404) {
      return {
        redirect: {
          destination: '/404',
          permanent: false
        }
      }
    }
  }

}

export default SinglePicturePage