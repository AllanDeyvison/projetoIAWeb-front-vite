import { createContext, ReactNode, useState } from "react";
import UserLogin from "../models/UserLogin";
import { login } from "../services/AuthService";
import { UserType } from "@/models/UserType";
import { ToastAlerts } from "@/utils/ToastAlerts";

interface AuthContextProps {
    user: UserLogin
    handleLogin(user: UserLogin): Promise<void>
    handleLogout(): void
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserLogin>({
        id: 0,
        username: "",
        password: "",
        token: "",
        name: "",
        picture: "",
        email: "",
        lastname: "",
        birthday: "",
        userType: UserType.USER
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(userLogin: UserLogin) {
        setIsLoading(true)

        try {
            await login(`/user/login`, userLogin, setUser)
            ToastAlerts("Login efetuado com sucesso", "sucesso")
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            ToastAlerts("Usuário ou senha inválidos", "erro")
            setIsLoading(false)
        }
    }

    function handleLogout() {
        setUser({
            id: 0,
            username: "",
            password: "",
            token: "",
            name: "",
            picture: "",
            email: "",
            lastname: '',
            birthday: "",
            userType: UserType.USER

        })
    }



    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )


}

export default AuthContext;

