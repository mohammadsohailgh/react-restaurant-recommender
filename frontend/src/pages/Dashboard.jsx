import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Card from '../components/Card.jsx'


function Dashboard() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {

      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
     <h1>Dashboard</h1>


      <h1>Previous three recommendations</h1>

      
      <h1>Review history</h1>


      <h1>Preferences</h1>


      <div className="album py-5 ">

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-md-4 g-3">

            <div className="col">
              <Card title="Pizza" description="" image="" />
            </div>
            <div className="col">
              <Card title="Pizza" description="" image="" />
            </div>
            <div className="col">
              <Card title="Pizza" description="" image="" />
            </div>
            <div className="col">
              <Card title="Pizza" description="" image="" />
            </div>

           
          </div>
        </div>


    </>


  )
}

export default Dashboard