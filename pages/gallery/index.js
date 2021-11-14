import {fetcher} from "../../components/api/fetcher";
import {SWRConfig} from "swr";

const GalleryPage = ({initGalleries, fallback}) => {
  return (
      <SWRConfig value={{fallback}}>

      </SWRConfig>
  )
}

export async function getServerSideProps(context) {
  const galleriesUrl = `${process.env.NextUrl}/api/albums`

  const initGalleries = fetcher(galleriesUrl)

  return {
    props: {
      initGalleries
    },
    fallback: {
      galleriesUrl: initGalleries
    }
  }
}

export default GalleryPage