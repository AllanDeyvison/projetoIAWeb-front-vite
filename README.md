# AprovIA Frontend

Este projeto é o frontend do sistema **AprovIA**, uma aplicação web desenvolvida com React, TypeScript e Vite. O objetivo do sistema é oferecer uma plataforma moderna e intuitiva para interação com uma IA, gerenciamento de usuários, upload de arquivos PDF e outras funcionalidades voltadas para facilitar o acesso e o uso de inteligência artificial em ambientes educacionais.

---

## 🧩 Como Funciona

O AprovIA Frontend é uma SPA (Single Page Application) que se comunica com um backend (API REST) para autenticação, cadastro, gerenciamento de chats e usuários. O usuário pode criar uma conta, fazer login, conversar com a IA, gerenciar seu perfil e, se for administrador, gerenciar outros usuários e realizar uploads de arquivos PDF para análise.

A interface foi construída pensando em acessibilidade, responsividade e experiência do usuário, utilizando TailwindCSS para estilização e React Router para navegação entre páginas.

---

## 🛠️ Como Foi Desenvolvido

O projeto foi estruturado em módulos para facilitar a manutenção e a escalabilidade:

- **Componentização:** Cada funcionalidade (chat, upload, edição de usuário, etc.) foi separada em componentes reutilizáveis dentro de [`src/components`](src/components).
- **Context API:** O gerenciamento de autenticação e chats utiliza React Contexts ([`src/contexts`](src/contexts)), permitindo o compartilhamento de estado global entre componentes.
- **Tipagem Estrita:** Todas as entidades (usuário, mensagem, etc.) são fortemente tipadas com TypeScript ([`src/models`](src/models)).
- **Serviços de API:** As requisições HTTP são centralizadas em arquivos de serviço ([`src/services`](src/services)), facilitando a integração e manutenção.
- **Estilização:** O TailwindCSS foi customizado para garantir uma identidade visual consistente e moderna.
- **Acessibilidade:** Foram seguidas boas práticas de acessibilidade, como uso de labels, navegação por teclado e feedbacks visuais.

---

## ✨ Funcionalidades

- **Autenticação de Usuário:** Cadastro, login, logout e persistência de sessão.
- **Chat com IA:** Interface de chat para interação com a inteligência artificial, com histórico de conversas.
- **Gerenciamento de Perfil:** Edição de dados pessoais, alteração de senha, upload de foto e exclusão de conta.
- **Upload de PDF:** (Para administradores) Upload de arquivos PDF para análise e processamento pela IA.
- **Administração:** Promoção de usuários para administradores e gerenciamento de permissões.
- **Acessibilidade e Responsividade:** Interface adaptada para diferentes dispositivos e navegação facilitada.
- **Notificações:** Feedback visual para ações do usuário através de toasts.
- **Ajuda/FAQ:** Página de perguntas frequentes para suporte ao usuário.

---

## 🏗️ Estrutura do Projeto

```
projetoIAWeb-front-vite/
├── public/                # Arquivos públicos (favicon, imagens)
├── src/
│   ├── components/        # Componentes reutilizáveis (editUser, uploadPDF, chat, etc)
│   ├── contexts/          # Contextos globais (ex: AuthContext, ChatContext)
│   ├── models/            # Tipos e interfaces TypeScript
│   ├── pages/             # Páginas principais (login, register, admin, help, home, etc)
│   ├── services/          # Serviços de API (ex: AuthService.ts, ChatService.ts)
│   ├── utils/             # Funções utilitárias (ex: ToastAlerts.ts)
│   ├── index.css          # Estilos globais (TailwindCSS)
│   └── main.tsx           # Ponto de entrada da aplicação
├── tailwind.config.js     # Configuração do TailwindCSS
├── package.json           # Dependências e scripts do projeto
├── tsconfig.json          # Configuração do TypeScript
└── vite.config.ts         # Configuração do Vite
```

---

## 🚀 Tecnologias Utilizadas

- **React** + **TypeScript**: Framework e tipagem estática
- **Vite**: Bundler e dev server rápido
- **TailwindCSS**: Framework de estilos utilitário
- **React Router DOM**: Navegação SPA
- **Axios**: Requisições HTTP
- **React Loader Spinner**: Indicadores de carregamento
- **React Icons**: Ícones SVG
- **ESLint**: Linter para código limpo
- **Outros Plugins**: `tailwindcss-animate`, `tailwind-scrollbar`, etc.

---

## 🛠️ Instalação e Execução

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/projetoIAWeb-front-vite.git
   cd projetoIAWeb-front-vite
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```
   Ou, se preferir:
   ```sh
   yarn
   ```

3. **Execute o projeto em modo desenvolvimento:**
   ```sh
   npm run dev
   ```
   O projeto estará disponível em `http://localhost:5173` (ou porta definida pelo Vite).

---

## 📦 Principais Módulos e Dependências

- `react`, `react-dom`, `react-router-dom`
- `typescript`
- `vite`
- `tailwindcss`, `postcss`, `autoprefixer`
- `axios`
- `react-loader-spinner`
- `react-icons`
- `eslint`
- Plugins: `tailwindcss-animate`, `tailwind-scrollbar`

---

## ⚙️ O que foi necessário instalar

Ao rodar `npm install`, as dependências acima são baixadas automaticamente conforme o `package.json`. Para garantir o funcionamento do TailwindCSS, execute também:

```sh
npx tailwindcss init -p
```

---

## 📋 Observações

- O backend deve estar rodando em `http://localhost:8090` para autenticação e demais funcionalidades.
- O projeto segue boas práticas de acessibilidade e responsividade.
- Para produção, recomenda-se configurar variáveis de ambiente e revisar as configurações de segurança.

---

## 📚 Mais informações

- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do React](https://react.dev/)
- [Documentação do TailwindCSS](https://tailwindcss.com/)

---
