import {Row, Col} from 'antd'
import Link from "next/link"


const TopNav = () => {
  return (
      <nav>
        <ul id='top-nav-container'>
          <li>
            <Link href='/'>
              خانه
            </Link>
          </li>
          <li>
            <Link href='/user/login'>
              ورود
            </Link>
          </li>
          <li>
            <Link href='/login'>
              گالری
            </Link>
          </li>
        </ul>
      </nav>
  )
}

export default TopNav