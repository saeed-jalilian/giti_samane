import {fetcher} from "../../components/api/fetcher";
import useSWR, {SWRConfig} from "swr";
import {Card} from "antd";

import CustomImage from "../../components/common/CustomImage";
import FullscreenSpin from "../../components/common/FullscreenSpin";

const GalleryPage = ({initGalleries, fallback}) => {

  const {data: albumsData} = useSWR(
      `${process.env.NextUrl}/api/albums`,
      fetcher,
      {fallbackData: initGalleries}
  )

  return (
      <SWRConfig value={{fallback}}>
        {albumsData ? albumsData.map(album => (
            <Card
                className='album-card'
                key={album.id}
                title={album.name}
                hoverable
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
        )) : <FullscreenSpin/>}
      </SWRConfig>
  )
}

export async function getServerSideProps(context) {
  const galleriesUrl = `${process.env.NextUrl}/api/albums`

  const initGalleries = fetcher(galleriesUrl)

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