import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Navbar from './components/navbar/Navbar'
import { ToastContainer } from 'react-toastify'
import MyModal from './components/editUser/EditUserModal'
import {AdminRoute } from './pages/admin/AdminRoute'
import { Admin } from './pages/admin/Admin'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer/>
            <Navbar />
            <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path='/home' element={<Home />} />
              <Route path='/edit:id' element={<MyModal/>} />
              <Route element={<AdminRoute/>}> 
                <Route path='/admin' element={<Admin/>}/>
              </Route>
            </Routes>
            </div> 
        </BrowserRouter>
    
      </AuthProvider>
    </>
  )
}

export default App
