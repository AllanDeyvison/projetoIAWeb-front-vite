import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import { useState } from "react";

const faqData = [
  {
    question: "Como faço login?",
    color: "bg-blue-500",
    answer: "Use seu nome de usuário e senha cadastrados. Se esquecer a senha, contate o suporte."
  },
  {
    question: "Como cadastrar?",
    color: "bg-green-500",
    answer: "Clique em \"Cadastre-se\" na tela de login e preencha todos os campos obrigatórios."
  },
  {
    question: "Como editar meu perfil?",
    color: "bg-yellow-500",
    answer: "Clique em \"Editar Perfil\" no menu lateral."
  },
  {
    question: "Como excluir minha conta?",
    color: "bg-red-500",
    answer: "Acesse \"Editar Perfil\" e clique em \"Deletar Usuário\"."
  },
  {
    question: "Problemas de acesso?",
    color: "bg-purple-500",
    answer: "Verifique se digitou corretamente seu e-mail e senha. Se persistir, contate o suporte."
  }
];

function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-blue-950 to-blue-900 py-12 flex items-center">
      <div className="max-w-2xl mx-auto p-8 bg-neutral-900 rounded-2xl shadow-2xl border border-blue-800 w-full">
        <div className="flex items-center gap-3 mb-6">
          <FaQuestionCircle className="text-blue-400 text-3xl" />
          <h1 className="text-3xl font-extrabold text-blue-100">Ajuda & FAQ</h1>
        </div>
        <ul className="list-none ml-0 space-y-5">
          {faqData.map((item, idx) => (
            <li key={idx} className="flex flex-col">
              <button
                className={`flex items-center gap-3 w-full text-left focus:outline-none transition rounded-lg px-2 py-2
                  hover:bg-blue-800/30 hover:ring-2 hover:ring-blue-400 group`}
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className={`mt-1 w-3 h-3 ${item.color} rounded-full inline-block group-hover:scale-110 transition`} />
                <span className="text-white font-semibold">{item.question}</span>
                <span className="ml-auto text-blue-300 text-lg">
                  {openIndex === idx ? "▲" : "▼"}
                </span>
              </button>
              {openIndex === idx && (
                <div
                  id={`faq-panel-${idx}`}
                  className="pl-8 pr-2 pt-2 text-white text-sm transition-all"
                >
                  {item.answer}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link
            to="/home"
            className="inline-block bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-800 focus:underline focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            tabIndex={0}
            aria-label="Voltar para o início"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Help;
