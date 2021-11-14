import {connect} from "react-redux";
import Link from "next/link"


const TopNav = ({isAuthenticated}) => {

  return (
      <nav>
        <ul id='top-nav-container'>
          <li>
            <Link href='/'>
              خانه
            </Link>
          </li>
          {!isAuthenticated ? (
              <li>
                <Link href='/user/login'>
                  ورود
                </Link>
              </li>

          ) : null}

          {isAuthenticated ? (
              <li>
                <Link href='/gallery'>
                  گالری
                </Link>
              </li>
          ) : null}

        </ul>
      </nav>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, null)(TopNav)