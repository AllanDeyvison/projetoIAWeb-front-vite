import { createContext, ReactNode, useEffect, useState } from "react";
import UserLogin from "../models/UserLogin";
import { login } from "../services/AuthService";
import { UserType } from "@/models/UserType";
import { ToastAlerts } from "@/utils/ToastAlerts";

interface AuthContextProps {
    user: UserLogin
    handleLogin(user: UserLogin, keepConnected?: boolean): Promise<void>
    handleLogout(): void
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    function getStoredUser(): UserLogin {
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch {
                // ignore parse error
            }
        }
        return {
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
        }
    }

    const [user, setUser] = useState<UserLogin>(getStoredUser());

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // Atualiza o estado se storage mudar externamente
        const syncUser = () => {
            setUser(getStoredUser());
        };
        window.addEventListener("storage", syncUser);
        return () => window.removeEventListener("storage", syncUser);
    }, []);

    async function handleLogin(userLogin: UserLogin, keepConnected = false) {
        setIsLoading(true)
        try {
            await login(`/user/login`, userLogin, (data: UserLogin) => {
                setUser(data);
                if (keepConnected) {
                    localStorage.setItem("user", JSON.stringify(data));
                } else {
                    localStorage.removeItem("user");
                }
            });
            ToastAlerts("Login efetuado com sucesso!", "sucesso")
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            ToastAlerts("Usuário ou senha inválidos.", "erro")
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
        });
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )


}

export default AuthContext;

