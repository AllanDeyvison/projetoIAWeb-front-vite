import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import User from '@/models/User'
import { update } from '@/services/AuthService'
import AuthContext from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import DeleteUser from './DeleteUser'
import { FiEdit2 } from 'react-icons/fi'
import { ToastAlerts } from '@/utils/ToastAlerts'

export default function EditUserModal() {
  let [isOpen, setIsOpen] = useState(false)
  const { user } = useContext(AuthContext);
  const token = user.token
  const navigate = useNavigate()
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerts('Você precisa estar logado para isso', "info")
      navigate('/login')
    }
  }, [token])


  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [newUser, setnewUser] = useState<User>(user);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setnewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  async function submitNewUser(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (confirmPassword === newUser.password) {
      try {
        await update(`/user/update`, newUser, setnewUser, {
          headers: { Authorization: token },
        }
        );
        ToastAlerts("Usuário Atualizado com sucesso!", "sucesso")
        close();
      } catch (error) {
        ToastAlerts("Erro ao Atualizar usuário!", "erro")
        console.log(token)
      }
    } else {
      ToastAlerts("Senhas não conferem!", "erro")
      setnewUser({ ...newUser, password: '' })
      setConfirmPassword('')
    }
  }



  return (
    <>
      <Button onClick={open} ><FiEdit2 className='w-6 h-6 mr-2' /></Button>

      {/* <Button onClick={open} className='flex items-center py-2.5 px-4 w-full text-left rounder transition duration-300 hover:bg-gray-100 hover:text-white'>
      <AiFillEdit className='w-6 h-6 mr-2' />
        <span className={`transition-opacity duration-300 delay-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
          {
            !isCollapsed && "Editar Perfil"
          }
        </span>
      </Button> */}

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close} __demoMode>
        <div className="fixed inset-0 z-10  overflow-y-auto backdrop-blur-2xl bg-white/5">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-lg rounded-xl p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">

              </DialogTitle>
              <div className="grid grid-cols-1  place-items-center  ">
                <div className="max-w-2xl p-5 mx-auto ">
                  <div className="bg-white shadow-md border border-gray-200 rounded-lg  p-4 sm:p-6 lg:p-10 dark:bg-gray-800 dark:border-gray-700">
                    <div className='flex justify-between'>
                      <div className='flex items-stretch'>
                        <img src={user.picture} className="h-10 w-10 rounded-full bg-black flex-shrink-0" />
                        <h1 className="self-center pl-1 ">{user.name}</h1>
                      </div>
                      <Button
                        className="text-gray-400 dark:text-white"
                        onClick={close}
                      ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </Button>
                    </div>
                    <form className="space-y-6 p-10" onSubmit={submitNewUser}>
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white" >Editar Perfil</h3>

                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"> Novo Nome</label>
                        <input type="text" id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={user.name}
                          name="name"
                          value={newUser.name}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Novo Sobrenome</label>
                        <input type="text" id="lastname"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={user.lastname}
                          name="lastname"
                          value={newUser.lastname}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                          } />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Novo Nome de Usuário</label>
                        <input type="text" id="username"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
  p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={user.username}
                          name="username"
                          value={newUser.username}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                          } />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="picture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Nova Foto URL</label>
                        <input type="url" id="picture" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
  focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500
   dark:focus:border-blue-500" placeholder={user.picture}
                          value={newUser.picture}
                          name="picture"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                          } />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Novo Email</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 
dark:focus:border-blue-500" placeholder={user.email}
                          value={newUser.email}
                          name="email"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                          } />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Nova Senha</label>
                        <input type="password" id="senha" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 
dark:focus:border-blue-500" placeholder="•••••••••"
                          value={newUser.password}
                          name="password"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)
                          } />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600">Confirmar senha</label>
                        <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark 
dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••"
                          value={confirmPassword}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmPassword(e)
                          }
                        />
                      </div>

                      <button type="submit"
                        className="text-white mr-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Editar</button>
                      <DeleteUser />
                    </form>

                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
