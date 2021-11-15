import {fetcher} from "../../components/api/fetcher";
import useSWR, {SWRConfig} from "swr";
import {Card, Row, Col} from "antd";
import cookie from "cookie";
import {useRouter} from "next/router";

import CustomImage from "../../components/common/CustomImage";
import FullscreenSpin from "../../components/common/FullscreenSpin";

const GalleryPage = ({initGalleries, fallback}) => {

  const router = useRouter()

  const {data: albumsData} = useSWR(
      `${process.env.NextUrl}/api/albums`,
      fetcher,
      {fallbackData: initGalleries}
  )

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
                    onClick={() => router.push(`${process.env.NextUrl}/album/${album.name.replace(' ', '%20')}`)}
                    cover={album.pictures ? (
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
                />
              </Col>
          )) : <FullscreenSpin/>}
        </Row>
      </SWRConfig>
  )
}

export async function getServerSideProps(context) {
  const galleriesUrl = `${process.env.BackendApiUrl}/albums`
  const cookies = cookie.parse(context.req.headers.cookie)
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