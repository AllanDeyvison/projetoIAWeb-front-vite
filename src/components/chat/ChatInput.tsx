import { FormEvent, useState } from "react";

function ChatInput({ addMessage }: { addMessage: (text: string) => void }) {

    const [inputValue, setInputValue] = useState("");

    const handleSend = (e: FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addMessage(inputValue);
            setInputValue("");
        }
    }

    return (
        <div>
            <form onSubmit={handleSend}>
                <div className="flex flex-row
                items-center h-16 
                rounded-xl border px-4">
                    <div className="flex-grow ml-4 text-white" >
                        <div className="relative w-full">
                            <input
                                id="message"
                                placeholder="Digite sua mensagem..."
                                name="message"
                                type="text"
                                className="flex w-full bg-transparent
                                rounded-xl  focus:outline-none 
                                focus:border-gray-300 pl-4 h-10"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="ml-4">
                        <button
                            className="flex items-center justify-center  hover:bg-gray-700 rounded-xl
                       text-white p-3 "
                            type="submit"
                        >
                            {/* <span>Enviar</span> */}
                            <span className="ml-2">
                                <svg
                                    className="w-5 h-5 transform rotate-45 -mt-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default ChatInput;