import {Fragment} from "react";
import cookie from "cookie";
import {fetcher} from "../../components/api/fetcher";

const AlbumPage = ({initAlbum, albumName}) => {
  console.log(initAlbum)
  return (
      <Fragment>
        this is `${albumName}`
      </Fragment>
  )
}

export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie ?? '')
  const {albumName} = context.params
  const auth = cookies.main
  const initAlbum = await fetcher(`${process.env.BackendApiUrl}/album/${albumName}`, auth)
  return {
    props: {
      initAlbum,
      albumName
    }
  }
}

export default AlbumPage