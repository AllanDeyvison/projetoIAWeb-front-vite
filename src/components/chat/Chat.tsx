import Message from "@/models/Message";
import { useContext, useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatAnswer from "./ChatAnswer";
import AuthContext from "@/contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {chatStream, resumeChat} from "@/services/ChatService";
import Sidebar from "../sidebar/Sidebar";
import { ToastAlerts } from "@/utils/ToastAlerts";
import Navbar from "../navbar/Navbar";
import { useChatContext } from "@/contexts/ChatContext";

function Chat() {

    const [messages, setMessages] = useState<Message[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);
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
        // setLoading(true);
        try {
            const response = await resumeChat(`/chats/${chatId}`, user.username);

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
            // setLoading(false);
        }
    }
  
 async function handleSendMessage(text: string) {
    // setLoading(true);

    const userMessage: Message = {
      role: "user",
      content: text,
      user: user,
      timestamp: new Date().toISOString(),
      // message: text,
    };
    const assistantPlaceholder: Message = {
      role: "assistant",
      content: "",
      user: user, 
      timestamp: new Date().toISOString(),
      // message: "",
    };

    // Adiciona a mensagem do usuário e o placeholder do assistente ao estado
    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      assistantPlaceholder,
    ]);

    let fullResponseContent = "";

    try {
      // Determina o endpoint com base na existência de um chatId
      const endpoint = chatId ? `/chats/${chatId}/add` : '/chats/new';
      
      const { reader, decoder, chatId: newChatId } = await chatStream(
        endpoint,
        text,
        user.username
      );

      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        fullResponseContent += chunk;
        // Atualiza a última mensagem do assistente com o novo pedaço de texto
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage.role === "assistant") {
            lastMessage.content = fullResponseContent;
          }
          return [...prevMessages];
        });
      }

      // Se for um novo chat, navega para a URL correta e atualiza a barra lateral
      if (!chatId && newChatId) {
        navigate(`/chat/${newChatId}`);
        refreshChats();
      }
    } catch (error) {
      console.error(error);
      ToastAlerts("Erro ao enviar mensagem.", "erro");
      // Se houver um erro, atualiza a última mensagem para exibir a falha
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage.role === "assistant") {
          lastMessage.content = "Ocorreu um erro ao gerar a resposta. Tente novamente.";
        }
        return [...prevMessages];
      });
    } finally {
      // setLoading(false);
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
                                            {message.role === 'assistant' && <ChatAnswer answer={message.content}/> }
                                           
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <ChatInput addMessage={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;