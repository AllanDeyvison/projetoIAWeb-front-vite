import Message from "@/models/Message";
import { useContext, useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatAnswer from "./ChatAnswer";
import { RotatingLines } from "react-loader-spinner";
import AuthContext from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { sendNewMessage, sendOldMessage } from "@/services/ChatService";
import Sidebar from "../sidebar/Sidebar";
import { ToastAlerts } from "@/utils/ToastAlerts";

function Chat() {

    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useContext(AuthContext);
    const token = user.token;


    const navigate = useNavigate();

    useEffect(() => {
        if (token === '') {
            //voltar pro login
            ToastAlerts('Faça login novamente...', "info");
            navigate('/login')
        }
    }, [token])

    async function addMessage(text: string) {
        const newMessage: Message = { message: text, answer: '', user: user };
        setMessages([...messages, newMessage]);
        setLoading(true);
        try {
            const resp = await sendOldMessage('http://localhost:5000/query', text);

            setMessages(prevMessages => {
                const updateMessages = prevMessages.map(msg =>
                    msg.message === text ? { ...msg, answer: resp } : msg
                )
                return updateMessages;
            });
            // const messageSend: Message = { message: text, answer: resp, user: user };
            // sendMessagesBack(messageSend);
            setLoading(false);

        } catch (error) {
            console.log(error);
            ToastAlerts("Erro ao enviar mensagem", "erro");
            setLoading(false);
        }
    }


    async function addMessageChatNew(text: string) {
        const newMessage: Message = { message: text, answer: '', user: user };
        setMessages([...messages, newMessage]);
        setLoading(true);
        try {
            const resp = await sendNewMessage('http://localhost:5000/chats/new', text, user.username);
            setMessages(prevMessages => {
                const updateMessages = prevMessages.map(msg =>
                    msg.message === text ? { ...msg, answer: resp } : msg
                )
                return updateMessages;
            });
            setLoading(false);

        } catch (error) {
            console.log(error);
            alert("Erro ao enviar mensagem");
            setLoading(false);
        }
    }


    return (
        <div className="flex  h-screen antialiased ">
             <Sidebar/>
            <div className="flex flex-row  w-screen overflow-x-hidden">
                <div className="flex flex-col flex-auto h-full p-6">
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-neutral-700 p-6">
                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">
                                    {messages.map((message, index) => (
                                        <div key={index} className="col-start-1 col-end-13 p-3 rounded-lg">
                                            <ChatMessage message={message} user={user} />
                                            {message.answer && <ChatAnswer answer={message.answer} />}

                                            {loading && index === messages.length - 1 && (
                                                <RotatingLines
                                                    strokeColor="black"
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    width="24"
                                                    visible={true}
                                                />
                                            )}
                                        </div>
                                    ))}

                                    {/* <div className="col-start-1 col-end-8 p-3 rounded-lg"> */}
                                    {/* {loading ?
                                            (<RotatingLines
                                                    strokeColor="black"
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    width="24"
                                                    visible={true}
                                                />):(messages.map((message) =>(
                                                <ChatAnswer answer={message.answer} />)))} */}
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                        <ChatInput addMessage={addMessageChatNew} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;