import {Fragment} from "react";
import cookie from "cookie";
import useSWR from "swr";
import {Typography, Row, Col, Card, message} from "antd";
import {IoPencilOutline, IoTrashOutline} from "react-icons/io5";
import {useDispatch} from "react-redux";

import {hideLoading, showLoading} from "react-redux-loading-bar";
import {fetcher} from "../../components/api/fetcher";
import http from "../../components/api/axiosConfig";
import CustomImage from "../../components/common/CustomImage";

const AlbumPage = ({initAlbum, initPictures, albumName}) => {

  const {Text, Title} = Typography
  const {Meta} = Card
  const dispatch = useDispatch()


  const {data: albumData} = useSWR(
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

  return (
      <Fragment>
        <Title level={2} className='album-title'>
          {albumData.name}
        </Title>
        <Row align='middle' justify='center'>
          {picturesData.results.map(picture => (
              <Col key={picture.id} span={6}>
                <Fragment>
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
                </Fragment>
              </Col>
          ))}
        </Row>

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