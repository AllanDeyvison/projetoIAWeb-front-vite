import { createContext, ReactNode, useState } from "react";
import UserLogin from "../models/UserLogin";
import { login } from "../services/AuthService";

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
        birthday: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(userLogin: UserLogin) {
        setIsLoading(true)

        try {
            await login(`/user/login`, userLogin, setUser)
            alert("Login efetuado com sucesso")
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            alert("Usuário ou senha inválidos")
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
            birthday: ""

        })
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )


}

export default AuthContext;

