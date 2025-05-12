import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";

function Help() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-blue-950 to-blue-900 py-12 flex items-center">
      <div className="max-w-2xl mx-auto p-8 bg-neutral-900 rounded-2xl shadow-2xl border border-blue-800">
        <div className="flex items-center gap-3 mb-6">
          <FaQuestionCircle className="text-blue-400 text-3xl" />
          <h1 className="text-3xl font-extrabold text-blue-100">Ajuda & FAQ</h1>
        </div>
        <ul className="list-none ml-0 space-y-5">
          <li className="flex items-start gap-3">
            <span className="mt-1 w-3 h-3 bg-blue-500 rounded-full inline-block" />
            <span className="text-white"><strong>Como faço login?</strong> Use seu nome de usuário e senha cadastrados. Se esquecer a senha, contate o suporte.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 w-3 h-3 bg-green-500 rounded-full inline-block" />
            <span className="text-white"><strong>Como cadastrar?</strong> Clique em "Cadastre-se" na tela de login e preencha todos os campos obrigatórios.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 w-3 h-3 bg-yellow-500 rounded-full inline-block" />
            <span className="text-white"><strong>Como editar meu perfil?</strong> Clique em "Editar Perfil" no menu lateral.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 w-3 h-3 bg-red-500 rounded-full inline-block" />
            <span className="text-white"><strong>Como excluir minha conta?</strong> Acesse "Editar Perfil" e clique em "Deletar Usuário".</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 w-3 h-3 bg-purple-500 rounded-full inline-block" />
            <span className="text-white"><strong>Problemas de acesso?</strong> Verifique se digitou corretamente seu e-mail e senha. Se persistir, contate o suporte.</span>
          </li>
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
