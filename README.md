# AprovIA Frontend

Este documento descreve o funcionamento do frontend AprovIA, sua estrutura, tecnologias utilizadas, dependências, e passos para rodar e buildar o projeto.

---

## 🔎 Visão Geral — como funciona

AprovIA é uma SPA (React + TypeScript + Vite) que se comunica com um backend via REST e streaming para:

- autenticação e cadastro de usuários;
- criação, listagem e exclusão de chats;
- envio de mensagens e recepção de respostas da IA via streaming (exibição incremental);
- edição e exclusão de perfil;

Fluxos principais:
- Streaming de chat: [src/services/ChatService.ts](src/services/ChatService.ts)
- Consumidor do stream: [src/components/chat/Chat.tsx](src/components/chat/Chat.tsx)
- Render de resposta (TTS): [src/components/chat/ChatAnswer.tsx](src/components/chat/ChatAnswer.tsx)
- Input por voz: [src/components/chat/ChatInput.tsx](src/components/chat/ChatInput.tsx)

Entrada / roteamento: [src/App.tsx](src/App.tsx)

---

## 🏛️ Estrutura do projeto (resumida)

projetoIAWeb-front-vite/
- public/
- src/
  - components/        — blocos reutilizáveis (chat, sidebar, navbar, edit user)
  - contexts/          — AuthContext, ChatContext, ModelContext
  - models/            — tipos/interfaces (User, Message, UserLogin, UserType)
  - pages/             — páginas (login, register, home, help)
  - services/          — integrações com APIs (AuthService, ChatService)
  - utils/             — utilitários (ToastAlerts)
  - index.css
  - main.tsx
- package.json
- vite.config.ts
- tailwind.config.js
- README.md

Links úteis:
- Roteamento / entrada: [src/App.tsx](src/App.tsx)
- Autenticação: [src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx), [src/services/AuthService.ts](src/services/AuthService.ts)
- Contexto de chats: [src/contexts/ChatContext.tsx](src/contexts/ChatContext.tsx)

---

## 🧩 Como foi desenvolvido (padrões e decisões)

- Componentização: UI dividida em componentes pequenos e reutilizáveis.
- Estado global: React Context API para autenticação e gerenciamento de chats.
- Serviços: chamadas HTTP / streaming isoladas em [src/services](src/services).
- Tipagem forte: TypeScript nas entidades em [src/models](src/models).
- Estilos: TailwindCSS com variáveis CSS para tema claro/escuro.
- Acessibilidade: labels, roles, atributos ARIA e navegação por teclado.
- Streaming: leitura incremental via reader/decoder (ver ChatService e loop em Chat.tsx).

---

## ✨ Funcionalidades principais

- Registro, login, logout e persistência (localStorage quando “manter conectado”).
- Histórico de chats na sidebar (através de ChatContext).
- Mensagens com streaming (render incremental e placeholder).
- Text-to-Speech (Web Speech API) em [src/components/chat/ChatAnswer.tsx](src/components/chat/ChatAnswer.tsx).
- Reconhecimento de voz (SpeechRecognition) em [src/components/chat/ChatInput.tsx](src/components/chat/ChatInput.tsx).
- Edição e exclusão de usuário via modais.
- Small UX improvements: toasts (react-toastify), loading spinners, teclado quente.

---

## 🧰 Tecnologias e dependências principais

Runtime / build:
- Node 18+ (recomendado Node 20)
- Vite (config: [vite.config.ts](vite.config.ts))

Linguagens / frameworks:
- React 18
- TypeScript 5
- JSX/TSX

Estilo e UI:
- TailwindCSS 3
- tailwindcss-animate, tailwind-scrollbar
- @headlessui/react (modals/dialogs)
- class-variance-authority, tailwind-merge (componentes UI)

Rede / utilitários:
- axios (integração com auth/API)
- fetch (streaming de ChatService)
- react-router-dom (roteamento)
- react-toastify (toasts)
- react-markdown (render markdown nas mensagens)
- react-icons (ícones)
- react-loader-spinner (spinners)

Dev / lint / build:
- eslint
- @vitejs/plugin-react
- typescript
- postcss / autoprefixer

Você pode ver a lista completa e versões em [package.json](package.json).

---

## 🛠️ Requisitos e instalação

Requisitos:
- Node 18+ (recomendado 20)
- Git

Instalação:
```bash
git clone <repo-url>
cd projetoIAWeb-front-vite
npm install
# ou
# yarn
```

Variáveis de ambiente (arquivo .env na raiz):
```
VITE_AUTH_API=http://localhost:8090
VITE_CHAT_API=http://127.0.0.1:5000
```

Rodar em desenvolvimento:
```bash
npm run dev
# acesse http://localhost:5173
```

Build para produção:
```bash
npm run build
npm run preview
```

---

## ⚠️ Notas importantes / integração

- Para TTS e reconhecimento de voz, o navegador deve suportar as Web Speech APIs.
- Garanta que VITE_* esteja correto antes do build (são injetadas no tempo de build).
- Para deploy em Vercel, veja [vercel.json](vercel.json) e o workflow de CI em [.github/workflows/pipeline.yml](.github/workflows/pipeline.yml).

---
## Contato

Desenvolvido por [Allan Deyvison, Biatriz, Nickolas] 
A API estará disponível em: [https://aprovia.vercel.app/)


---
