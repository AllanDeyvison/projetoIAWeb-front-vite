import { Dialog, DialogPanel, Button } from "@headlessui/react";
import { FiTrash } from "react-icons/fi";
import { useState, useContext } from "react";
import { deleteChat } from "@/services/ChatService";
import { ToastAlerts } from "@/utils/ToastAlerts";
import AuthContext from "@/contexts/AuthContext";
import { useChatContext } from "@/contexts/ChatContext";

interface DeleteChatProps {
  chatId: string;
  chatTitle?: string;
}

export default function DeleteChat({ chatId, chatTitle }: DeleteChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { refreshChats } = useChatContext();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  async function handleDelete() {
    try {
      await deleteChat("/chats", user.username, chatId);
      ToastAlerts("Chat deletado com sucesso.", "sucesso");
      refreshChats();
    } catch (error: any) {
      ToastAlerts(error.message || "Erro ao deletar chat", "erro");
    } finally {
      close();
    }
  }

  return (
    <>
      <Button
        onClick={open}
        className="p-1 rounded"
        title="Deletar chat"
        tabIndex={0}
        aria-label={`Deletar chat${chatTitle ? ` ${chatTitle}` : ""}`}
      >
        <FiTrash className="w-4 h-4 text-gray-500 hover:text-red-600" />
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-40 overflow-y-auto backdrop-blur-2xl bg-black/40">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-xl">
              <div className="grid grid-cols-1 place-items-center">
                <div className="max-w-2xl p-5 mx-auto">
                  <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-center font-semibold mb-4 text-gray-900 dark:text-gray-100">
                      Tem certeza que deseja deletar este chat{chatTitle ? `: "${chatTitle}"` : "?"}
                    </p>
                    <p className="text-center mb-4 text-gray-700 dark:text-gray-300">
                        Esta ação não pode ser desfeita.
                    </p>
                    <div className="flex justify-around">
                      <button
                        onClick={close}
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 transition"
                        tabIndex={0}
                        aria-label="Cancelar exclusão"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleDelete}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 transition"
                        tabIndex={0}
                        aria-label="Confirmar exclusão"
                      >
                        Deletar
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
  );
}