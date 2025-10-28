import { FormEvent, useRef, useState } from "react";

function ChatInput({ addMessage }: { addMessage: (text: string) => void }) {
    const [inputValue, setInputValue] = useState("");
    const [isDictating, setIsDictating] = useState(false);
    const recognitionRef = useRef<any | null>(null);

    const handleSend = (e: FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addMessage(inputValue);
            setInputValue("");
        }
    };

    const handleDictate = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Reconhecimento de voz não suportado neste navegador.");
            return;
        }

        // Se já existe uma instância e está gravando, para a gravação (toggle)
        if (recognitionRef.current && isDictating) {
            recognitionRef.current.stop();
            return;
        }

        // Cria nova instância se necessário
        if (!recognitionRef.current) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.lang = "pt-BR";
            recognitionRef.current.interimResults = false;
            recognitionRef.current.maxAlternatives = 1;

            recognitionRef.current.onstart = () => {
                // reinicia o input quando a captura de áudio começa
                setInputValue("");
                setIsDictating(true);
            };
            recognitionRef.current.onresult = (event: any) => {
                const transcript = Array.from(event.results)
                    .map((r: any) => r[0].transcript)
                    .join(" ");
                setInputValue((prev) => (prev ? prev + " " + transcript : transcript));
            };
            recognitionRef.current.onerror = () => {
                // encerra feedback em caso de erro
                setIsDictating(false);
            };
            recognitionRef.current.onend = () => {
                setIsDictating(false);
                // limpa instância para recriar no próximo uso (opcional)
                recognitionRef.current = null;
            };
        }

        try {
            recognitionRef.current.start();
        } catch (err) {
            // em alguns browsers start() lança se já estiver rodando
            console.warn("SpeechRecognition start error", err);
        }
    };

    return (
        <form className="flex flex-row items-center h-16 rounded-xl border px-3" onSubmit={handleSend}>
            {/* Microfone (esquerda) */}
            <button
                type="button"
                onClick={handleDictate}
                aria-label={isDictating ? "Parar gravação" : "Iniciar gravação"}
                className="flex items-center justify-center p-3 rounded-xl mr-3 hover:bg-gray-800 text-white relative"
            >
                {/* Ícone microfone */}
                <svg
                    className={`w-5 h-5 ${isDictating ? "text-red-400" : "text-white"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 1.75a3.25 3.25 0 0 0-3.25 3.25v5a3.25 3.25 0 0 0 6.5 0v-5A3.25 3.25 0 0 0 12 1.75z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M19 10.5v.75a6.75 6.75 0 0 1-13.5 0v-.75"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M12 18.5v3.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 22.25h8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {/* Indicador de gravação (ponto vermelho pulsante) */}
                {isDictating && (
                    <span className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                )}
            </button>

            {/* Input central */}
            <div className="flex-grow">
                <input
                    id="message"
                    placeholder="Digite sua mensagem..."
                    name="message"
                    type="text"
                    className="w-full bg-transparent rounded-xl focus:outline-none focus:border-gray-300 pl-2 h-10 text-white"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>

            {/* Botão enviar (direita) */}
            <button
                type="submit"
                className="flex items-center justify-center ml-3 p-3 rounded-xl hover:bg-gray-800 text-white"
                aria-label="Enviar mensagem"
            >
                <svg
                    className="w-5 h-5 text-white rotate-45"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2 12l19-9-7 9 7 9-19-9z"
                    />
                </svg>
            </button>
        </form>
    );
}

export default ChatInput;