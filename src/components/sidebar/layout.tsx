import { useContext, useState } from 'react';
import {  AiOutlineClose } from 'react-icons/ai'
import { FiEdit, FiLogOut, FiSidebar } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import EditUserModal from '../editUser/EditUserModal';
import AuthContext from '@/contexts/AuthContext';

const Layout = () => {
      const navigate = useNavigate();
    
      const { user, handleLogout } = useContext(AuthContext);
    
      function logout() {
        handleLogout();
        alert('Usuário deslogado com sucesso');
        navigate('/login');
      }
    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <>
            <div className={`h-screen bg-black text-gray-100 flex flex-col ${isCollapsed ? 'w-15' : 'w-80'} transition-all duration-300`}>
                <div className="flex items-center justify-between h-20 bg-black border-b border-gray-700 p-4">
                    {
                        !isCollapsed && (
                            <button className='flex items-center'>
                            <FiEdit className='w-6 h-6 mr-2' />
                             <h1 className=" text-2xl  ">Novo Chat
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
                    <nav className='mt-10'>

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
};

export default Layout;
