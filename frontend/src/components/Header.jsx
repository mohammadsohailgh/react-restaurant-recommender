import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <>





      <nav className="navbar navbar-expand-lg navbar-light py-3 border-bottom  ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">

            <Link to='/'>Restaurant Recommender</Link>



          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">

            {user ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Features</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Pricing</a>
                  </li>
                </ul>

                <span >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item nav-link">
                      <button className="btn btn-dark nav-item" onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                      </button>
                    </li>
                  </ul>
                </span>
              </>
            ) : (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                </ul>
                <span >

                  {/* <div className="collapse navbar-collapse" id="navbarText"> */}
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item nav-link">
                      {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}


                      <Link to='/login'>
                        <FaSignInAlt /> Login

                      </Link>


                    </li>
                    <li className="nav-item nav-link">
                      <Link to='/register'>
                        <FaUser /> Register

                      </Link>
                      {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                    </li>
                  </ul>
                  {/* </div> */}


                </span>
              </>
            )}
          </div>
        </div>
      </nav>















      {/* 
      <header className='header'>
        <div className='logo'>
          <Link to='/'>Restaurant Recommender</Link>
        </div>
        <ul>
          {user ? (
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>

            </li>
          ) : (
            <>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <FaUser /> Register
                </Link>
              </li>
            </>)
          }

        </ul>
      </header> */}




    </>
  )
}

export default Header