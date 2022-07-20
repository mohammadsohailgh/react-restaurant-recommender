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
          <div className="navbar-brand">
            <Link to='/'>Recommender</Link>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">

            {user ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <div className="nav-link active" aria-current="page" >
                      <Link to='/history'>History</Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link" >
                      <Link to='/roulette'>Roulette</Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link" >
                      <Link to='/preferences'>Preferences</Link>
                    </div>
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
                <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                  <li className="nav-item">
                    <div className="nav-link active" aria-current="page" >
                      <Link to='/history'>  </Link>
                    </div>
                  </li>
                </ul>
                <span >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item nav-link">
                      <Link to='/login'>
                        <FaSignInAlt /> Login
                      </Link>
                    </li>
                    <li className="nav-item nav-link">
                      <Link to='/register'>
                        <FaUser /> Register
                      </Link>
                    </li>
                  </ul>
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