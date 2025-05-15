import AuthContext from "@/contexts/AuthContext";
import { updateUserType } from "@/services/AuthService";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewAdminUser = () => {
    const { user } = useContext(AuthContext);
    const token = user.token
    const navigate = useNavigate()
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado para isso')
            navigate('/login')
        }
    }, [token])


    const [emailUserType, setuserEmail] = useState('');

    function updateState(e: ChangeEvent<HTMLInputElement>) {
        setuserEmail(e.target.value);
    }

    async function submitNewAdmin(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            await updateUserType(`/user/changeUserType`, emailUserType, {
                headers: { Authorization: token },
            }
            );
            alert("Admin Aticionado com sucesso!")
            close();
        } catch (error) {
            alert("Erro ao Adicionar admin!")
            console.log(token)
        }

    }

    return (
        <div>

            <Button
                onClick={open}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
                tabIndex={0}
                aria-label="Adicionar Novo Admin"
            >
                Adicionar Novo Admin
            </Button>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close} __demoMode>
                <div className="fixed inset-0 z-10  overflow-y-auto backdrop-blur-2xl bg-white/5">
                    <div className="flex min-h-full items-center justify-center">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                            </DialogTitle>
                            <div className="grid grid-cols-1  place-items-center  ">
                                <div className="max-w-2xl mx-auto ">
                                    <div className="bg-white shadow-md border border-gray-200 rounded-lg sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                                        <div className='flex justify-between'>
                                            <Button
                                                className="text-gray-400 dark:text-white"
                                                onClick={close}
                                            ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </Button>
                                        </div>
                                        <form className="space-y-6 p-10" onSubmit={submitNewAdmin} >
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-600">Adicionar novo Admin</label>
                                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 transition" placeholder={user.email}
                                                    value={emailUserType}
                                                    name="email"
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)} />
                                            <button type="submit"
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
                                                tabIndex={0}
                                                aria-label="Adicionar Admin"
                                            >
                                                Adicionar Admin</button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>



        </div>
    )
}