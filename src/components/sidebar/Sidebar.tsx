import { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit, FiLogOut, FiSidebar, FiHelpCircle } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import EditUserModal from '../editUser/EditUserModal';
import AuthContext from '@/contexts/AuthContext';
import { ToastAlerts } from '@/utils/ToastAlerts';
import { useHotkeys } from 'react-hotkeys-hook';
import { useChatContext } from '@/contexts/ChatContext';



function Sidebar() {

    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true)
    const { user, handleLogout } = useContext(AuthContext);
    const { chats, refreshChats } = useChatContext();

    function logout() {
        handleLogout();
        ToastAlerts('Usuário deslogado com sucesso.', "info");
        navigate('/login');
    }

    useEffect(() => {
        refreshChats();
    }, []);

 

    useHotkeys('ctrl+shift+l', () => logout(), [user]);



    return (
        <>
            <div className={`h-screen bg-neutral-800 text-gray-100 flex flex-col ${isCollapsed ? 'w-15' : 'w-80'} transition-all duration-300`}>
                <div className="flex items-center justify-between h-12 border-b border-gray-700 p-4">
                    {
                        !isCollapsed && (
                            <button
                                className='flex items-center group cursor-pointer transition-colors duration-200 hover:bg-purple-800  p-1 rounded'
                                title="Novo Chat"
                                tabIndex={0}
                                onClick={() => navigate('/chat')}
                                aria-label="Novo Chat"
                            >
                                <FiEdit className='w-6 h-6 mr-2 group-hover:text-white' />
                                <h1 className="text-lg group-hover:text-white">Novo Chat</h1>
                            </button>
                        )
                    }
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className='text-gray-100 focus:outline-none'
                        aria-label={isCollapsed ? "Abrir menu lateral" : "Fechar menu lateral"}
                    >
                        {isCollapsed ? <FiSidebar size={24} /> : <AiOutlineClose size={24} />}
                    </button>
                </div>
                <div className='flex-1 flex flex-col justify-between overflow-hidden'>
                    <nav className={` ${!isCollapsed ? 'overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-800 max-h-[500px]' : ''} flex-1`}>
                        {chats.map(chat => (
                            <div
                                key={chat.chat_id}
                                className={`flex items-center gap-2 ${!isCollapsed ? 'px-3 py-2 mb-1  bg-neutral-800 hover:bg-purple-800 focus:bg-teal-800 cursor-pointer transition-colors outline-none ring-0 focus:ring-2 focus:ring-blue-400' : ''}`}
                                onClick={() => navigate(`/chat/${chat.chat_id}`)}
                                tabIndex={0}
                                role="button"
                                aria-label={`Abrir chat ${chat.title}`}
                                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/chat/${chat.chat_id}`); }}
                            >
                                <span className={`ml-2 transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'} flex-1`}>
                                    {!isCollapsed && (
                                        <p className="truncate font-normal text-gray-200">{chat.title}</p>
                                    )}
                                </span>
                            </div>
                        ))}
                    </nav>
                    <div className='mb-10 transition-opacity duration-300 delay-300'>
                        <EditUserModal isCollapsed={isCollapsed} />
                        <Link to="/help" tabIndex={-1}>
                          <button
                            className='flex items-center py-2.5 px-4 w-full text-left  transition duration-300 hover:bg-purple-800 hover:text-white focus:bg-blue-800 focus:text-white outline-none'
                            tabIndex={0}
                            aria-label="Ajuda"
                          >
                            <FiHelpCircle className='w-6 h-6 mr-2' />
                            <span className={`transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                              {!isCollapsed && "Ajuda"}
                            </span>
                          </button>
                        </Link>
                        <Link to="/" className='' onClick={logout} tabIndex={-1}>
                        <button
                            className='flex items-center py-2.5 px-4 w-full text-left transition duration-300 hover:bg-red-700 hover:text-white focus:bg-red-800 focus:text-white outline-none'
                            tabIndex={0}
                            aria-label="Sair"
                        >
                            <FiLogOut className='w-6 h-6 mr-2' />
                            <span className={`transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                                {
                                    !isCollapsed && "Sair"
                                }
                            </span>
                        </button></Link>
                    </div>
                </div>
            </div>

        </>
    );

}

export default Sidebar