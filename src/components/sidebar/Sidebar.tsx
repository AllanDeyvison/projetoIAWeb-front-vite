import { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit, FiLogOut, FiSidebar } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import EditUserModal from '../editUser/EditUserModal';
import AuthContext from '@/contexts/AuthContext';
import { listChats } from '@/services/ChatService';
import { ToastAlerts } from '@/utils/ToastAlerts';

interface Chat {
    chat_id: string;
    title: string;
    updated_at: Date;
}

function Sidebar() {

    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [chats, setChats] = useState<Chat[]>([]);

    const { user, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerts('Usuário deslogado com sucesso', "info");
        navigate('/login');
    }

    useEffect(() => {
        async function fetchChats() {
            if (user && user.username) {
                try {
                    const chatsList = await listChats('http://localhost:5000/chats', user.username);
                    setChats(chatsList);
                } catch (error) {
                    console.error(error);
                }
            }
        }

        fetchChats();
    }, [user]);



    return (
        <>
            <div className={`h-screen bg-neutral-800 text-gray-100 flex flex-col ${isCollapsed ? 'w-15' : 'w-80'} transition-all duration-300`}>
                <div className="flex items-center justify-between h-12  border-b border-gray-700 p-4">
                    {
                        !isCollapsed && (
                            <button className='flex items-center'>
                                <FiEdit className='w-6 h-6 mr-2' />
                                <h1 className=" text-lg  ">Novo Chat
                                </h1>
                            </button>
                        )
                    }
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className='text-gray-100 focus:outline-none'
                    >
                        {isCollapsed ? <FiSidebar size={24} /> : <AiOutlineClose size={24} />}
                    </button>
                </div>
                <div className='flex-1 flex flex-col justify-between overflow-hidden'>
                    <nav className={` ${!isCollapsed ? 'overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-800 max-h-[500px]' : ''} flex-1`}>
                        {chats.map(chat => (
                            <div key={chat.chat_id} className={` ${!isCollapsed ? ' p-2 rounded hover:bg-neutral-900 cursor-pointer transition-all' : ''} flex-1`} onClick={() => navigate(`/chat/${chat.chat_id}`)}>
                                <span className={`ml-2 transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                                    {!isCollapsed && <p className="truncate">{chat.title}</p>}
                                    {!isCollapsed && <small className="truncate">
                                        {chat.updated_at.toLocaleString('pt-BR')}
                                        {/* {new Date(chat.updated_at).toLocaleString('pt-BR', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            // second: '2-digit',
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric', 
                                        })} */}
                                    </small>}
                                </span>
                            </div>
                        ))}

                    </nav>


                    <div className='mb-10 transition-opacity duration-300 delay-300'>
                        <button className='flex items-center py-2.5 px-4 w-full text-left rounder transition duration-300 hover:bg-gray-900 hover:text-white'>
                            <EditUserModal />
                            <span className={`transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                                {
                                    !isCollapsed && "Editar Perfil"
                                }
                            </span>
                        </button>
                        <button className='flex items-center py-2.5 px-4 w-full text-left rounder transition duration-300 hover:bg-red-700 hover:text-white'>
                            <Link to="/" className='' onClick={logout} >
                                <FiLogOut className='w-6 h-6 mr-2' /></Link>
                            <span className={`transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                                {
                                    !isCollapsed && "Sair"
                                }
                            </span>

                        </button>
                    </div>
                </div>
            </div>

        </>
    );

}

export default Sidebar