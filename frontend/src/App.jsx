import {Routes,Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import {UserContextProvider} from './context/userContext' 
import Dashboard from './pages/Dashboard'
import Edit from './pages/Edit'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <Toaster 
        position='top-right'
        toastOptions={{duration:2000}}
      />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
