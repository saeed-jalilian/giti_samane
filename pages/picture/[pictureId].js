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
  const [title, setTitle] = useState(pictureData.title)
  const [titleChanged, setTitleChanged] = useState(false)
  const [desc, setDesc] = useState(pictureData.desc)
  const [descChanged, setDescChanged] = useState(false)
  const [img, setImg] = useState(null)
  const [imgChanged, setImgChanged] = useState(false)

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  const handlePictureEdit = async () => {
    dispatch(showLoading())
    if (title.length === 0 && desc.length === 0) {
      message.error('عنوان و یا شرح نمیتواند خالی باشد')
      dispatch(hideLoading())
    } else {
      let formData = new FormData()
      try {
        if (titleChanged) {
          formData.append('title', title)
        }
        if (descChanged) {
          formData.append('desc', desc)
        }
        if (imgChanged) {
          formData.append('img', img, img.name)
        }
        await http.patch(`${process.env.NextUrl}/api/picture/${pictureId}`, formData)
        await mutate()
        message.success('تغییرات با موفقیت اعمال شد')
      } catch (e) {
        message.error('متاسفانه با خطایی مواجه شدیم، لطفا مجددا تلاش کنید')
      } finally {
        dispatch(hideLoading())
      }
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
      <Row align='middle' justify='space-between'>
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
            >
              <Input
                  onChange={e => {
                    setTitleChanged(true)
                    setTitle(e.target.value)
                  }}
                  placeholder='عنوان عکس را وارد کنید'
                  defaultValue={pictureData.title}
              />
            </Form.Item>

            <Form.Item
                label='شرح'
                name='desc'
            >
              <Input
                  onChange={e => {
                    setDescChanged(true)
                    setDesc(e.target.value)
                  }}
                  placeholder='شرح عکس را وارد کنید'
                  defaultValue={pictureData.desc}
                  value={desc}
              />
            </Form.Item>

            <Form.Item
                label='تصویر'
                name='img'
            >
              <Input
                  type='file'
                  accept='image/*'
                  onChange={e => {
                    setImgChanged(true)
                    setImg(e.target.files[0])
                  }}
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
  const cookies = cookie.parse(context.req.headers.cookie ?? '')
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