import {fetcher} from "../../components/api/fetcher";
import useSWR, {SWRConfig} from "swr";
import {Card, Row, Col, message} from "antd";
import cookie from "cookie";
import {useRouter} from "next/router";
import {IoPencilOutline, IoTrashOutline} from "react-icons/io5";
import {useDispatch} from "react-redux";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import {useEffect} from "react";
import {useSelector} from "react-redux";

import CustomImage from "../../components/common/CustomImage";
import FullscreenSpin from "../../components/common/FullscreenSpin";
import http from "../../components/api/axiosConfig";

const GalleryPage = ({initGalleries, fallback}) => {

  const router = useRouter()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  const {data: albumsData, mutate} = useSWR(
      `${process.env.NextUrl}/api/albums`,
      fetcher,
      {fallbackData: initGalleries}
  )

  const handleDeleteAlbum = async albumName => {
    dispatch(showLoading())
    try {
      await http.delete(`${process.env.NextUrl}/api/single-album/${albumName}`)
      await mutate()
      await router.push(`${process.env.NextUrl}/albums`)
      message.success('آلبوم با موفقیت حذف شد')
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
      <SWRConfig value={{fallback}}>
        <Row align='middle' justify='center' gutter={[16, 16]}>
          {albumsData ? albumsData.map(album => (
              <Col key={album.id} span={6}>
                <Card
                    className='album-card'
                    title={album.name}
                    hoverable
                    headStyle={{textAlign: 'center'}}
                    onClick={() => router.push(`${process.env.NextUrl}/single-album/${album.name.replace(' ', '%20')}`)}
                    cover={album.pictures[0] ? (
                        <CustomImage
                            width={300}
                            height={300}
                            layout='fixed'
                            src={album.pictures[0]}
                            alt={album.name}
                        />
                    ) : (
                        <CustomImage
                            width={300}
                            height={300}
                            layout='fixed'
                            src={'/img/no-image.png'}
                            alt={album.name}
                        />
                    )}
                    actions={[
                      <IoTrashOutline onClick={() => handleDeleteAlbum(album.name.replace(' ', '%20'))} key='delete'/>,
                    ]}
                />
              </Col>
          )) : <FullscreenSpin/>}
        </Row>

      </SWRConfig>
  )
}

export async function getServerSideProps(context) {
  const galleriesUrl = `${process.env.BackendApiUrl}/albums`
  const cookies = cookie.parse(context.req.headers.cookie ?? '')
  const auth = cookies.main

  const initGalleries = await fetcher(galleriesUrl, auth)

  return {
    props: {
      initGalleries,
      fallback: {
        galleriesUrl: initGalleries
      }
    },

  }
}

export default GalleryPage