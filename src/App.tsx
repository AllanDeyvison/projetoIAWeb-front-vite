import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { ToastContainer } from 'react-toastify'
import MyModal from './components/editUser/EditUserModal'
// import { AdminRoute } from './pages/admin/AdminRoute'
// import { Admin } from './pages/admin/Admin'
import Help from './pages/help/Help'
import 'react-toastify/dist/ReactToastify.css';
import Chat from './components/chat/Chat'
import { ChatProvider } from './contexts/ChatContext'
import { ModelProvider } from './contexts/ModelContext'

function App() {



  return (
    <>
      <ModelProvider>
        <AuthProvider>
          <ChatProvider>
            <BrowserRouter>
              <ToastContainer />
              {/* <Navbar /> */}
              <div className="min-h-[80vh]">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/chat/:chatId?' element={<Chat />} />
                  <Route path='/edit:id' element={<MyModal isCollapsed={false} />} />
                  <Route path='/help' element={<Help />} />
                  {/* <Route element={<AdminRoute />}>
                    <Route path='/admin' element={<Admin />} />
                  </Route> */}
                </Routes>
              </div>
            </BrowserRouter>
          </ChatProvider>
        </AuthProvider>
      </ModelProvider>
    </>
  )
}

export default App
