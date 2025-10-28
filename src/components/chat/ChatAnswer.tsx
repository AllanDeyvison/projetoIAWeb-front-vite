import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { FiVolume2 } from 'react-icons/fi';

function useTextToSpeech() {
    const speak = (text: string, onEnd: () => void) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'pt-BR';
        speech.onend = onEnd;
        window.speechSynthesis.speak(speech);
    };

    return { speak };
}

function ChatAnswer({ answer }: { answer: any }) {
    const { speak } = useTextToSpeech();
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleSpeak = () => {
        if (!answer) return;
        setIsSpeaking(true);
        speak(answer, () => setIsSpeaking(false));
    };

    return (
        <>
            <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="ml-3 text-sm">
                    {/* Caixa de resposta com largura limitada para não esticar */}
                    <div className="relative bg-white py-2 px-4 shadow rounded-xl max-w-xl w-auto">
                        <ReactMarkdown>{answer}</ReactMarkdown>
                    </div>

                    {/* Botão abaixo da caixa, alinhado à esquerda */}
                    <div className="mt-2 flex justify-start">
                        <button
                            onClick={handleSpeak}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 disabled:opacity-50"
                            aria-label={isSpeaking ? "TTS em andamento" : "Ouvir resposta"}
                            title={isSpeaking ? "Falando..." : "Ouvir resposta"}
                            disabled={isSpeaking}
                        >
                            <FiVolume2 aria-hidden="true" className="w-5 h-5 text-white" />
                            <span className="sr-only">{isSpeaking ? 'Falando...' : 'Ouvir'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatAnswer;