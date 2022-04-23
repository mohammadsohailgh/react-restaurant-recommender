import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Reviews from './pages/Reviews';
import Preferences from './pages/Preferences';
import Login from './pages/Login';
import Register from './pages/Register';
import Roulette from './pages/Roulette';

function App() {
  return (
    <>    
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reviews' element={<Reviews />} />
            <Route path='/roulette' element={<Roulette />} />
            <Route path='/preferences' element={<Preferences />} />
          </Routes>
        </div>
      </Router> 
      <ToastContainer />
    </>

  );
}

export default App;
