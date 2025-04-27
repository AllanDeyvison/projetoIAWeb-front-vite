import AuthContext from "@/contexts/AuthContext"
import { deleteUser } from "@/services/AuthService"
import { ToastAlerts } from "@/utils/ToastAlerts"
import { Button, Dialog, DialogPanel } from "@headlessui/react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

function DeleteUser() {
    let [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate();
    const { user, handleLogout } = useContext(AuthContext);
    const token = user.token
    const id = user.id
    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    function logout() {
        handleLogout();
        ToastAlerts('Usuário deslogado com sucesso', "info");
        navigate('/login');
    }

    async function deleteU() {
        try {
            await deleteUser(`/user/${id}`, {
                headers: {
                    Authorization: token
                }
            })
            ToastAlerts('Usuario deletado', "sucesso")
            logout()
        } catch (error) {
            ToastAlerts('Deu pra deletar não', "erro")
        }
    }

    return (
        <>
            <Button
                onClick={open}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                Deletar Usuário
            </Button>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close} __demoMode>
                <div className="fixed inset-0 z-10  overflow-y-auto backdrop-blur-2xl bg-white/5">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition className="w-full max-w-md rounded-xl p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">

                            <div className="grid grid-cols-1  place-items-center  ">
                                <div className="max-w-2xl p-5 mx-auto ">
                                    <div className="bg-white shadow-md border border-gray-200 rounded-lg  p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                                        <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar seu usuário?</p>
                                        <div className='flex justify-around'>
                                            <button onClick={close}
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Não</button>
                                            <button onClick={deleteU}
                                                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                Sim
                                            </button>
                                        </div>


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

export default DeleteUser;