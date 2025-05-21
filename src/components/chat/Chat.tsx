import Message from "@/models/Message";
import { useContext, useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatAnswer from "./ChatAnswer";
import { RotatingLines } from "react-loader-spinner";
import AuthContext from "@/contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { chatAdd, resumeChat} from "@/services/ChatService";
import Sidebar from "../sidebar/Sidebar";
import { ToastAlerts } from "@/utils/ToastAlerts";
import Navbar from "../navbar/Navbar";
import { useChatContext } from "@/contexts/ChatContext";

function Chat() {

    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useContext(AuthContext);
    const { refreshChats } = useChatContext();
    const { chatId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (chatId) {
            loadMessages(chatId);
        }else{
            setMessages([]);
        }

    }, [chatId]);

    async function loadMessages(chatId: string) {
        setLoading(true);
        try {
            const response = await resumeChat(`http://localhost:5000/chats/${chatId}`, user.username);

            const formattedMessages = response.messages.map((msg: any) => ({
                role: msg.role,
                content: msg.content,
                user: user
            }));

            setMessages(formattedMessages);
        } catch (error) {
            console.error(error);
            ToastAlerts("Erro ao carregar mensagens.", "erro");
        } finally {
            setLoading(false);
        }
    }

    async function addMessages(text: string, chatId: string) {
        setLoading(true);
        const newMessage: Message = { message: text, answer: '', user: user, role: "user", content: text, timestamp: new Date().toISOString() };
        setMessages([...messages, newMessage]);
        try {
            await chatAdd(`http://localhost:5000/chats/${chatId}/add`, text, user.username);
            loadMessages(chatId);
        } catch (error) {
            console.error(error);
            ToastAlerts("Erro ao carregar mensagens.", "erro");
        } finally {
            setLoading(false);
        }
    }


    async function addMessageChatNew(text: string) {
        const newMessage: Message = { message: text, answer: '', user: user, role: "user", content: text, timestamp: new Date().toISOString() };
        setMessages([...messages, newMessage]);
        setLoading(true);
        try {
            const resp = await chatAdd('http://localhost:5000/chats/new', text, user.username);
            console.log("Resposta da API:", resp);
            const newChatId = resp.answer.chat_id;  
            navigate(`/chat/${newChatId}`);
            refreshChats();

        } catch (error) {
            console.log(error);
            ToastAlerts("Erro ao enviar mensagem.", "erro");

        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="flex h-screen antialiased ">
            <Sidebar />
            <div className="flex flex-row  w-screen overflow-x-hidden">
                <div className="flex flex-col flex-auto h-full p-6">
                    <Navbar />
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-b-2xl bg-neutral-700 p-6 ">

                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">
                                    {messages.map((message, index) => (
                                        <div key={index} className="col-start-1 col-end-13 p-3 rounded-lg">
                                            {message.role === 'user' && <ChatMessage message={message} user={user} />}
                                            {message.role === 'assistant' && <ChatAnswer answer={message.content} />}
                                            <div className="p-3">
                                                {loading && index === messages.length - 1 && (
                                                    <RotatingLines strokeColor="black" strokeWidth="5" animationDuration="0.75" width="50" visible={true} />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <ChatInput addMessage={(text: string) => {
                            if (chatId) {
                                addMessages(text, chatId);
                            } else {
                                addMessageChatNew(text);
                            }
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;