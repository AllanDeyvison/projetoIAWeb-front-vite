import { createContext, useContext, useEffect, useState } from "react";
import { ToastAlerts } from "@/utils/ToastAlerts";
import AuthContext from "./AuthContext";
import { resumeChat } from "@/services/ChatService";

interface Chat {
    chat_id: string;
    title: string;
    updated_at: Date;
}

interface ChatContextType {
    chats: Chat[];
    refreshChats: () => void;
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [chats, setChats] = useState<Chat[]>([]);
      const { user } = useContext(AuthContext);
    const refreshChats = async () => {
        if (user && user.username) {
            try {
                const chatsList = await resumeChat("http://localhost:5000/chats", user.username);
                setChats(chatsList);
            } catch (error) {
                ToastAlerts("Erro ao carregar chats.", "erro");
                console.error(error);
            }
        }
    };

    useEffect(() => {
        refreshChats();
    }, [user]);

    return (
        <ChatContext.Provider value={{ chats, refreshChats, setChats }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatContext deve ser usado dentro de ChatProvider");
    }
    return context;
};
