import { Link } from "react-router-dom";

function Help() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Ajuda & FAQ</h1>
      <ul className="list-disc ml-6 space-y-2">
        <li><strong>Como faço login?</strong> Use seu nome de usuário e senha cadastrados. Se esquecer a senha, contate o suporte.</li>
        <li><strong>Como cadastrar?</strong> Clique em "Cadastre-se" na tela de login e preencha todos os campos obrigatórios.</li>
        <li><strong>Como editar meu perfil?</strong> Clique em "Editar Perfil" no menu lateral.</li>
        <li><strong>Como excluir minha conta?</strong> Acesse "Editar Perfil" e clique em "Deletar Usuário".</li>
        <li><strong>Problemas de acesso?</strong> Verifique se digitou corretamente seu e-mail e senha. Se persistir, contate o suporte.</li>
      </ul>
      <div className="mt-6">
        <Link
          to="/home"
          className="text-blue-700 hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded transition"
          tabIndex={0}
          aria-label="Voltar para o início"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}

export default Help;
