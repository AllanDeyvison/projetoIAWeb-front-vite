import AuthContext from "@/contexts/AuthContext"
import { UserType } from "@/models/UserType"
import { useContext, useEffect } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"


export const AdminRoute = () => {
    const { user } = useContext(AuthContext)
    const token = user.token

    const navigate = useNavigate();

      useEffect(() => {
            if(token === '') {
              //voltar pro login
              alert('Faça login novamente...')
              navigate('/login')
            }
          }, [token])

  return user?.userType === UserType.ADMIN ? (<Outlet />) : (
    <Navigate to="/login"/>);
}