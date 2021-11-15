import {Fragment, useState} from "react";
import cookie from "cookie";
import useSWR from "swr";
import {Typography, Row, Col, Card, message, Tooltip, Modal, Form, Input} from "antd";
import {IoPencilOutline, IoTrashOutline, IoAddOutline} from "react-icons/io5";
import {useDispatch} from "react-redux";

import {hideLoading, showLoading} from "react-redux-loading-bar";
import {fetcher} from "../../components/api/fetcher";
import http from "../../components/api/axiosConfig";
import CustomImage from "../../components/common/CustomImage";

const AlbumPage = ({initAlbum, initPictures, albumName}) => {

  const {Text, Title} = Typography
  const {Meta} = Card
  const dispatch = useDispatch()

  const [pictureForm] = Form.useForm()

  const [isAddPicModalVisible, setIsAddPicModalVisible] = useState(false)
  const [pictureToAdd, setPictureToAdd] = useState(null)


  const {data: albumData, mutate: albumMutate} = useSWR(
      `${process.env.NextUrl}/api/album/${albumName}`,
      fetcher,
      {fallbackData: initAlbum}
  )

  const {data: picturesData, mutate: picturesMutate} = useSWR(
      `${process.env.NextUrl}/api/album/${albumName}/pictures`,
      fetcher,
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
      await http.post(`${process.env.NextUrl}/api/album/${albumName}/pictures`, form)
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

  return (
      <Fragment>
        <Title level={2} className='album-title'>
          {albumData.name}
        </Title>
        <Row align='middle' justify='center'>
          {picturesData.results.map(picture => (
              <Col key={picture.id} span={6}>
                <Card
                    className='album-card'
                    title={picture.title}
                    cover={<CustomImage
                        width={300}
                        height={300}
                        layout='fixed'
                        src={picture.img}
                        alt={picture.title}
                    />}
                    actions={[
                      <IoPencilOutline key='edit'/>,
                      <IoTrashOutline onClick={() => handlePictureDelete(picture.id)} key='delete'/>
                    ]}
                >
                  <Meta description={picture.desc ?? ''}/>
                </Card>
              </Col>
          ))}
          <Tooltip title='افزودن تصویر'>
            <IoAddOutline onClick={handleShowAddPicModal} size={24}/>
          </Tooltip>
        </Row>

        <Modal
            title='افزودن تصویر'
            visible={isAddPicModalVisible}
            okText='ثبت'
            onCancel={handleCancelPicModal}
            className='modal-container'
        >
          <Form
              form={pictureForm}
              labelCol={5}
              wrapperCol={19}
              onFinish={handleAddPicture}
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

      </Fragment>
  )
}

export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie ?? '')
  const auth = cookies.main
  const {albumName} = context.params
  const initAlbum = await fetcher(`${process.env.BackendApiUrl}/album/${albumName}`, auth)
  const initPictures = await fetcher(`${process.env.BackendApiUrl}/album/${albumName}/pictures`, auth)
  return {
    props: {
      initAlbum,
      initPictures,
      albumName
    }
  }
}

export default AlbumPage