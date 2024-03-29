import {Fragment, useEffect, useState} from "react";
import cookie from "cookie";
import useSWR from "swr";
import {Typography, Row, Col, Card, message, Tooltip, Modal, Form, Input} from "antd";
import {IoPencilOutline, IoTrashOutline, IoAddOutline} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";

import {hideLoading, showLoading} from "react-redux-loading-bar";
import {fetcher} from "../../components/api/fetcher";
import http from "../../components/api/axiosConfig";
import CustomImage from "../../components/common/CustomImage";

const AlbumPage = ({initAlbum, initPictures, albumName}) => {

  const {Text, Title} = Typography
  const {Meta} = Card
  const dispatch = useDispatch()
  const router = useRouter()
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  const [pictureForm] = Form.useForm()
  const [titleForm] = Form.useForm()

  const [isAddPicModalVisible, setIsAddPicModalVisible] = useState(false)
  const [isTitleModalVisible, setIsTitleModalVisible] = useState(false)
  const [pictureToAdd, setPictureToAdd] = useState(null)


  const {data: albumData, mutate: albumMutate} = useSWR(
      `${process.env.NextUrl}/api/single-album/${albumName}`,
      {fallbackData: initAlbum}
  )

  const {data: picturesData, mutate: picturesMutate} = useSWR(
      `${process.env.NextUrl}/api/single-album/${albumName}/pictures`,
      {fallbackData: initPictures}
  )

  const handlePictureDelete = async pictureId => {
    dispatch(showLoading())
    try {
      await http.delete(`${process.env.NextUrl}/api/picture/${pictureId}`)
      await picturesMutate()
      message.success('عکس با موفقیت حذف شد')
    } catch (e) {
      message.error('متاسفانه با خطایی مواجه شدیم، لطفا مجددا تلاش کنید')
    } finally {
      dispatch(hideLoading())
    }
  }

  const handleShowTitleModal = () => {
    setIsTitleModalVisible(true)
  }

  const handleCancelTitleModal = () => {
    setIsTitleModalVisible(false)
  }

  const handleTitleEdit = async values => {
    dispatch(showLoading())
    try {
      const {name} = values
      const body = {name}
      await http.patch(`${process.env.NextUrl}/api/single-album/${albumName}`, body)
      await albumMutate()
      await router.push(`${process.env.NextUrl}/single-album/${name.replace(' ', '%20')}`)
      setIsTitleModalVisible(false)
      message.success('عنوان آلبوم با موفقیت تغییر پیدا کرد')
    } catch (e) {
      message.error('متاسفانه با خطایی مواجه شدیم، لطفا مجددا تلاش کنید')
    } finally {
      dispatch(hideLoading())
    }
  }

  const handleShowAddPicModal = () => {
    setIsAddPicModalVisible(true)
  }

  const handleCancelPicModal = () => {
    setIsAddPicModalVisible(false)
  }

  const handleAddPicture = async values => {
    dispatch(showLoading())
    const {title, desc} = values
    const form = new FormData()
    try {
      form.append('title', title)
      form.append('desc', desc)
      form.append('img', pictureToAdd, pictureToAdd.name)
      await http.post(`${process.env.NextUrl}/api/single-album/${albumName}/pictures`, form)
      await picturesMutate()
      await albumMutate()
      setIsAddPicModalVisible(false)
      message.success('تصویر با موفقیت اضافه شد')
    } catch (e) {
      message.error('متاسفانه با خطایی مواجه شدیم، لطفا مجددا تلاش کنید')
    } finally {
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    const userAuthenticated = async () => {
      if (!isAuthenticated) {
        await router.push(`${process.env.NextUrl}/user/login`)
      }
    }
    userAuthenticated()
  }, [isAuthenticated, router])

  return (
      <Fragment>
        <Tooltip title='ویرایش عنوان'>
          <Title onClick={handleShowTitleModal} level={2} className='album-title'>
            {albumData.name}
          </Title>
        </Tooltip>
        <Row align='middle' justify='space-between'>
          <Col span={22}>
            <Row align='middle' justify='center'>
              {picturesData.results.map(picture => (
                  <Col key={picture.id} span={8}>
                    <Card
                        className='album-card'
                        title={picture.title}
                        cover={<CustomImage
                            width={300}
                            height={300}
                            layout='fixed'
                            src={picture.img}
                            alt={picture.title}
                            onClick={async () => await router.push(`${process.env.NextUrl}/picture/${picture.id}`)}
                        />}
                        actions={[
                          <IoTrashOutline onClick={() => handlePictureDelete(picture.id)} key='delete'/>,
                          <IoPencilOutline
                              onClick={async () => await router.push(`${process.env.NextUrl}/picture/${picture.id}`)}
                              key='edit'/>
                        ]}
                    >
                      <Meta description={picture.desc ?? ''}/>
                    </Card>
                  </Col>
              ))}
            </Row>
          </Col>
          <Col span={2}>
            <Tooltip title='افزودن تصویر'>
              <IoAddOutline
                  className='add-pic-icon'
                  onClick={handleShowAddPicModal}
                  size={24}
              />
            </Tooltip>
          </Col>
        </Row>

        <Modal
            title='افزودن تصویر'
            visible={isAddPicModalVisible}
            okText='ثبت'
            onCancel={handleCancelPicModal}
            className='modal-container'
            onOk={() => pictureForm.submit()}
        >
          <Form
              form={pictureForm}
              labelCol={5}
              wrapperCol={19}
              onFinish={handleAddPicture}
              className='modal-form'
          >
            <Form.Item
                name='title'
                label='عنوان'
                rules={[
                  {
                    required: true,
                    message: 'عنوان تصویر باید وارد شود'
                  }
                ]}
            >
              <Input
                  placeholder='عنوان تصویر را وارد کنید'
              />
            </Form.Item>
            <Form.Item
                name='desc'
                label='شرح'
                rules={[
                  {
                    required: true,
                    message: 'شرح تصویر باید وارد شود'
                  }
                ]}
            >
              <Input
                  placeholder='شرح تصویر را وارد کنید'
              />
            </Form.Item>
            <Form.Item
                name='img'
                label='تصویر'
                rules={[
                  {
                    required: true,
                    message: 'تصویر باید آپلود شود'
                  }
                ]}
            >
              <Input
                  type='file'
                  accept='image/*'
                  onChange={e => setPictureToAdd(e.target.files[0])}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
            title='تغییر عنوان آلبوم'
            okText='ثبت'
            onCancel={handleCancelTitleModal}
            onOk={() => titleForm.submit()}
            className='modal-container'
            visible={isTitleModalVisible}
        >
          <Form
              className='modal-form'
              form={titleForm}
              labelCol={5}
              wrapperCol={19}
              onFinish={handleTitleEdit}
          >
            <Form.Item
                name='name'
                label='عنوان'
                rules={[
                  {
                    required: true,
                    message: 'عنوان محصول باید وارد شود'
                  }
                ]}
            >
              <Input
                  placeholder='عنوان جدید را وارد کنید'
              />
            </Form.Item>
          </Form>
        </Modal>

      </Fragment>
  )
}

export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie ?? '')
  const auth = cookies.main
  const {albumName} = context.params

  try {
    const initAlbum = await fetcher(`${process.env.BackendApiUrl}/album/${albumName}`, auth)
    const initPictures = await fetcher(`${process.env.BackendApiUrl}/album/${albumName}/pictures`, auth)

    return {
      props: {
        initAlbum,
        initPictures,
        albumName
      }
    }
  } catch (e) {
    if (e.response.status === 403) {
      return {
        redirect: {
          destination: "/user/login",
          permanent: false
        }
      }
    }
  }


}

export default AlbumPage